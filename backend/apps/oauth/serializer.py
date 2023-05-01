
from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.emails.tasks import send_email
from django.utils.html import strip_tags
from django.template.loader import render_to_string


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ['email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, data):
        user = get_user_model().objects.create(
            email=data['email']
        )
        user.set_password(data['password'])
        user.save()

        html_message = render_to_string(
            'emails/register.html', {'context': 'values'})

        plain_message = strip_tags(html_message)

        send_email(
            subject='Register',
            recipient_list=[user.email],
            message=plain_message,
            html_message=html_message
        )

        return user
