# Generated by Django 4.2 on 2023-05-01 09:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='OAuth',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('provider_id', models.CharField(max_length=255, null=True, unique=True)),
                ('provider_name', models.CharField(max_length=255)),
                ('access_token', models.CharField(max_length=255, null=True)),
                ('refresh_token', models.CharField(max_length=255, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now_add=True)),
                ('username', models.CharField(max_length=255, null=True)),
                ('deleted_at', models.DateTimeField(null=True)),
                ('auth_profile', models.JSONField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'oauth',
            },
        ),
    ]
