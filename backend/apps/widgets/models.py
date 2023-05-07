from uuid import uuid4
from django.contrib.auth import get_user_model
from django.db import models

from ..files.models import File


class Widget(models.Model):
    slug = models.UUIDField(default=uuid4, editable=False, unique=True)

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
    open_widget = models.PositiveIntegerField(default=0)
    full_watched = models.PositiveIntegerField(default=0)
    click_cta = models.PositiveIntegerField(default=0)
    unique_watched = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'widget'

    def increase_analytic_fields(self, data):
        for key, value in data.items():
            if value:
                setattr(self, key, getattr(self, key) + 1)
        self.save()
