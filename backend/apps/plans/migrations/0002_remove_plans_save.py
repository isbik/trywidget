# Generated by Django 4.2 on 2023-05-03 23:23

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('plans', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='plans',
            name='save',
        ),
    ]