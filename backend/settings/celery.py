from celery.schedules import crontab
from datetime import timedelta


CELERY_BROKER_URL = "redis://127.0.0.1:6381"
CELERY_RESULT_BACKEND = "redis://127.0.0.1:6381"

CELERY_BEAT_SCHEDULE = {
    'delete_inactive_files': {
        'task': 'apps.files.tasks.delete_inactive_files',
        'schedule': crontab(minute='0', hour='*/2')
    }
}

DELETE_INACTIVE_FILES_TIME = timedelta(hours=1)
