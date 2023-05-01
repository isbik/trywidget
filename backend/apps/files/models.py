from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings
import os


class File(models.Model):
    active = models.BooleanField(db_index=True,
                                 default=False)
    url = models.TextField()
    size = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE)

    def set_active(self):
        self.active = True
        file_name = str(self.url).removeprefix('temp/')
        old_url = os.path.join(settings.TEMP_ROOT, file_name)
        new_url = os.path.join(settings.STATIC_ROOT, file_name)
        if not os.path.exists(settings.STATIC_ROOT):
            os.makedirs(settings.STATIC_ROOT)

        if os.path.isfile(old_url):
            os.rename(old_url, new_url)
            self.url = 'static/' + file_name
        self.save(update_fields=['active', 'url'])


