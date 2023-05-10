from django.utils.decorators import method_decorator
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from rest_framework import generics
from django.http import JsonResponse

from apps.feedback.models import Feedback
from apps.feedback.serializers import FeedbackSerializer
from apps.emails.tasks import send_email
from django.utils.html import strip_tags
from django.template.loader import render_to_string

feedback_create_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={'data': openapi.Schema(type=openapi.TYPE_STRING)},
)


@method_decorator(
    name='post',
    decorator=swagger_auto_schema(responses={200: feedback_create_schema}),
)
class FeedbackView(generics.CreateAPIView):
    queryset = Feedback
    serializer_class = FeedbackSerializer

    def perform_create(self, serializer):

        instance = serializer.save(user=self.request.user)
        context = {
            'name': getattr(instance, 'name'),
            'email': getattr(instance, 'email'),
            'text': getattr(instance, 'text'),
            'user_id': self.request.user.id,
        }

        html_message = render_to_string('emails/feedback.html', context)

        plain_message = strip_tags(html_message)

        send_email.delay(
            subject='Register',
            recipient_list=['trywidgetapp@gmail.com'],
            message=plain_message,
            html_message=html_message
        )

        return JsonResponse({'data': 'ok'})
