from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError
from django.conf import settings


class Command(BaseCommand):
    def handle(self, *args, **options):
        try:
            get_user_model().objects.create_superuser(email=settings.ADMIN_EMAIL,
                                                      password=settings.ADMIN_PASSWORD)
        except IntegrityError:
            print('user with this email is already exists')
