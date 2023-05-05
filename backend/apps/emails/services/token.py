from django.utils.html import strip_tags
from django.template.loader import render_to_string
from apps.emails.tasks import send_email


def send_token(email, token):
    html_message = render_to_string(
        'emails/register.html', {'token': token})

    plain_message = strip_tags(html_message)
    send_email.delay(
        subject='Register',
        recipient_list=[email],
        message=plain_message,
        html_message=html_message
    )
