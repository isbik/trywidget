import os
from django.dispatch import receiver
from django.db.models.signals import pre_delete
from django.conf import settings
from .models import File


@receiver(pre_delete, sender=File)
def delete_file(sender, instance, **kwargs):
    """ instance.url: folder(temp, static)/filename
    """
    # folder, file_name = instance.url.split('/')
    # if folder == 'temp':
    #     file_url = os.path.join(settings.TEMP_ROOT, file_name)
    # else:
    #     file_url = os.path.join(settings.STATIC_ROOT, file_name)
    #
    # if os.path.isfile(file_url):
    #     os.remove(file_url)
    if instance.url and os.path.isfile(instance.url):
        os.remove(instance.url)
    if (
            instance.preview_image_url and
            os.path.isfile(instance.preview_image_url)
    ):
        os.remove(instance.preview_image_url)
