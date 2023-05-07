from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
import os

from apps.files.services import generate_preview


class File(models.Model):
    name = models.CharField(max_length=256)
    active = models.BooleanField(db_index=True,
                                 default=False)
    url = models.TextField()
    size = models.TextField()
    preview_image_url = models.URLField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE)

    class Meta:
        db_table = 'file'

    @property
    def get_url(self):
        if self.url:
            return settings.API_URL + self.url
        return None

    @property
    def get_preview_image_url(self):
        if self.preview_image_url:
            return settings.API_URL + self.preview_image_url
        return None

    def set_active(self):
        folder = f'{datetime.now().date()}/'
        dir_file = settings.MEDIA_ROOT.joinpath(folder)

        file_name = str(self.url).removeprefix(settings.TEMP_URL)
        old_file_path = os.path.join(settings.TEMP_ROOT, file_name)

        file_name = f'{self.id}.{file_name}'
        file_path = os.path.join(dir_file, file_name)

        if not os.path.exists(dir_file):
            os.makedirs(dir_file)

        MEDIA_URL = settings.MEDIA_URL.lstrip('/')
        if os.path.isfile(old_file_path):
            os.rename(old_file_path, file_path)
            self.url = f'{MEDIA_URL}{folder}{file_name}'

        temp_image_name = file_name.split(".")
        temp_image_name.pop()
        image_name = f'{".".join(temp_image_name)}.jpg'
        image_path = os.path.join(dir_file, image_name)

        try:
            generate_preview(file_path, image_path)
        except Exception as err:
            print(err)
        else:
            self.preview_image_url = f'{MEDIA_URL}{folder}{image_name}'

        self.active = True
        self.save(update_fields=['active', 'url', 'preview_image_url'])
