from django.db import models
from django.contrib.auth import get_user_model


class Feedback(models.Model):

    name = models.CharField(max_length=56)
    email = models.EmailField()
    text = models.CharField(max_length=256)

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='feedbacks',
        default=None, null=True
    )

    def __str__(self):
        return self.name
