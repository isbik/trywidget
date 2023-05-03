import cv2
from datetime import datetime
from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
import os


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
        return settings.API_URL + self.url

    @property
    def get_preview_image_url(self):
        return settings.API_URL + self.preview_image_url

    def set_active(self):
        self.active = True
        folder = f'{datetime.now().date()}/'
        dir_file = os.path.join(settings.STATIC_ROOT, folder)

        file_name = str(self.url).removeprefix('temp/')
        old_file_path = os.path.join(settings.TEMP_ROOT, file_name)

        file_name = f'{self.id}.{file_name}'
        file_path = os.path.join(dir_file, file_name)

        if not os.path.exists(dir_file):
            os.makedirs(dir_file)

        if os.path.isfile(old_file_path):
            os.rename(old_file_path, file_path)
            self.url = f'static/{folder}{file_name}'

        temp_image_name = file_name.split(".")
        temp_image_name.pop()
        image_name = f'{".".join(temp_image_name)}.jpg'
        image_path = os.path.join(dir_file, image_name)

        capture = cv2.VideoCapture(file_path)
        ret, frame = capture.read()
        is_success, im_buf_arr = cv2.imencode('.jpg', frame)
        im_buf_arr.tofile(image_path)
        capture.release()

        self.preview_image_url = f'static/{folder}{image_name}'

        self.save(update_fields=['active', 'url', 'preview_image_url'])
