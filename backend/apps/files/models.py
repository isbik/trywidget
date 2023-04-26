from django.db import models
from django.contrib.auth import get_user_model


class File(models.Model):
    active = models.BooleanField(db_index=True,
                                 default=False)
    url = models.TextField()
    size = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    user = models.ForeignKey(get_user_model(),
                             on_delete=models.CASCADE)

