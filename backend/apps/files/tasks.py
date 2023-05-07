from celery import shared_task
from django.utils import timezone
from django.db.models import F
from .models import File
from django.conf import settings


@shared_task()
def delete_inactive_files():
    filter_ = {
        'active': False,
        't__gt': settings.DELETE_INACTIVE_FILES_TIME
    }
    File.objects.annotate(
        t=(timezone.now() - F('created_at'))).filter(**filter_).delete()
