from smtplib import SMTPException
from celery.utils.log import get_task_logger
from django.core.mail import send_mail
from django.conf import settings
from config.celery import app

logger = get_task_logger(__name__)


@app.task()
def send_email(subject,
               message,
               recipient_list,
               from_email=settings.DEFAULT_FROM_EMAIL,
               fail_silently=False,
               connection=None,
               html_message=None,):

    logger.info("Sending email {}", recipient_list)

    send_mail(
        subject=subject,
        message=message,
        from_email=from_email,
        fail_silently=fail_silently,
        recipient_list=recipient_list,
        connection=connection,
        html_message=html_message,

    )

    logger.info("Sent Email")
