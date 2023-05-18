# Generated by Django 4.2 on 2023-05-18 07:23

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0005_alter_payments_payment_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='payments',
            name='internal_payment_id',
            field=models.CharField(default="", max_length=256),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='payments',
            name='payment_id',
            field=models.UUIDField(
                default=uuid.uuid4, editable=False, unique=True),
        ),
    ]
