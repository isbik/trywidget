from celery.schedules import crontab
from datetime import timedelta

CELERY_BEAT_SCHEDULE = {
    'delete_inactive_files': {
        'task': 'apps.files.tasks.delete_inactive_files',
        'schedule': crontab(minute='0', hour='*/2')
    }
}

DELETE_INACTIVE_FILES_TIME = timedelta(hours=1)

CELERY_BROKER_URL = "redis://redis:6379/0"
CELERY_RESULT_BACKEND = "redis://redis:6379/0"


