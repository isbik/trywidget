# Generated by Django 4.2 on 2023-05-03 14:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('files', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='file',
            name='preview_image_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
