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

    def delete(self, using=None, keep_parents=False):
        file_path = os.path.join(settings.BASE_DIR, self.url)
        preview_path = os.path.join(settings.BASE_DIR, self.preview_image_url)
        print(file_path, preview_path)
        os.remove(file_path)
        os.remove(preview_path)
        return super().delete(using, keep_parents)

    def set_active(self):
        self.active = True
        file_name = str(self.url).removeprefix('temp/')
        preview_name = str(self.preview_image_url).removeprefix('temp/')

        old_url = os.path.join(settings.TEMP_ROOT, file_name)
        old_preview_url = os.path.join(settings.TEMP_ROOT, preview_name)

        new_url = os.path.join(settings.STATIC_ROOT, file_name)
        new_preview_url = os.path.join(settings.STATIC_ROOT, preview_name)

        if not os.path.exists(settings.STATIC_ROOT):
            os.makedirs(settings.STATIC_ROOT)

        if os.path.isfile(old_url):
            os.rename(old_url, new_url)
            self.url = 'static/' + file_name

        if os.path.isfile(old_preview_url):
            os.rename(old_preview_url, new_preview_url)
            self.preview_image_url = 'static/' + preview_name

        self.save(update_fields=['active', 'url', 'preview_image_url'])


