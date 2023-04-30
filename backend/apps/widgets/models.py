from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.postgres import fields as postgres


class Widget(models.Model):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(verbose_name='name', max_length=100)
    preview_image_url = models.TextField()
    video_url = models.TextField()
    updated_at = models.DateField()
    created_at = models.DateField(auto_now_add=True)
    settings = postgres.JSONField(verbose_name='settings')


class WidgetAnalytics(models.Model):
    open_widget = models.ForeignKey('Widget', on_delete=models.CASCADE)
    full_watched = models.PositiveIntegerField()
    click_cta = models.PositiveIntegerField()
    unique_watched = models.PositiveIntegerField()
