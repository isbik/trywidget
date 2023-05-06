from rest_framework.serializers import ValidationError
from rest_framework import serializers
from django.contrib.auth import get_user_model
from uuid import uuid4
from django.utils.html import strip_tags
from django.template.loader import render_to_string

import settings
from apps.users.services.email import is_email_taken
from apps.emails.tasks import send_email
from apps.emails.services.token import send_token


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()
    password = serializers.CharField(min_length=8, write_only=True)

    def validate_email(self, value):
        if is_email_taken(value):
            raise ValidationError('email is already taken')
        return value

    class Meta:
        model = get_user_model()
        fields = ['email', 'password']

    def create(self, data):
        verify_token = uuid4()
        user = get_user_model().objects.create(
            email=data['email'],
            is_active=False,
            email_verify_token=verify_token
        )
        user.set_password(data['password'])
        user.save()

        send_token(user.email,
                   'Register',
                   'register.html',
                   client_url=settings.CLIENT_URL,
                   token=verify_token)

        # html_message = render_to_string(
        #     'emails/register.html', {'token': verify_token})
        #
        # plain_message = strip_tags(html_message)
        # send_email.delay(
        #     subject='Register',
        #     recipient_list=[user.email],
        #     message=plain_message,
        #     html_message=html_message
        # )

        return user


class Email(serializers.Serializer):
    email = serializers.EmailField()


class Password(serializers.Serializer):
    password = serializers.CharField(min_length=8, write_only=True)
