from django.db import models
from django.contrib.auth import get_user_model

from apps.users.models import User


class OAuth(models.Model):
    provider_id = models.CharField(max_length=255, null=True, unique=True)
    provider_name = models.CharField(max_length=255)
    access_token = models.CharField(max_length=255, null=True)
    refresh_token = models.CharField(max_length=255, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    username = models.CharField(max_length=255, null=True)
    deleted_at = models.DateTimeField(null=True)
    auth_profile = models.JSONField()

    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False)

    class Meta:
        db_table = 'oauth'
