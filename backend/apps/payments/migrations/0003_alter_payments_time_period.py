# Generated by Django 4.2 on 2023-05-09 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0002_alter_payments_table'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payments',
            name='time_period',
            field=models.IntegerField(choices=[('month', 'month'), ('year', 'year')]),
        ),
    ]
