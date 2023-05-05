# Generated by Django 4.2 on 2023-05-05 00:19

from django.db import migrations
import uuid


def gen_uuid(apps, schema_editor):
    model = apps.get_model('widgets', 'Widget')
    for row in model.objects.all():
        row.slug = uuid.uuid4()
        row.save()


class Migration(migrations.Migration):

    dependencies = [
        ('widgets', '0004_alter_widget_table'),
    ]

    operations = [
        migrations.RunPython(gen_uuid, reverse_code=migrations.RunPython.noop),
    ]
