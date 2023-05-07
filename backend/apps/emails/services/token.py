from django.utils.html import strip_tags
from django.template.loader import render_to_string
from apps.emails.tasks import send_email


def send_token(email, subject, html_filename, **kwargs):
    html_message = render_to_string(
        f'emails/{html_filename}', kwargs)

    plain_message = strip_tags(html_message)
    send_email.delay(
        subject=subject,
        recipient_list=[email],
        message=plain_message,
        html_message=html_message
    )
