from django.contrib.auth import get_user_model
from django.db import models

from ..files.models import File


class Widget(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name='widgets',
    )
    name = models.CharField(verbose_name='name', max_length=100)
    video = models.ForeignKey(
        File, on_delete=models.SET_NULL, blank=True, null=True
    )
    updated_at = models.DateField(auto_now=True)
    created_at = models.DateField(auto_now_add=True)
    settings = models.JSONField(verbose_name='settings', default=dict)


# class WidgetAnalytics(models.Model):
#     open_widget = models.ForeignKey(
#         'Widget',
#         on_delete=models.CASCADE,
#         related_name='analytics',
#     )
#     full_watched = models.PositiveIntegerField()
#     click_cta = models.PositiveIntegerField()
#     unique_watched = models.PositiveIntegerField()
