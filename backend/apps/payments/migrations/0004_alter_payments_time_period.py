# Generated by Django 4.2 on 2023-05-09 19:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('payments', '0003_alter_payments_time_period'),
    ]

    operations = [
        migrations.AlterField(
            model_name='payments',
            name='time_period',
            field=models.CharField(choices=[('month', 'month'), ('year', 'year')]),
        ),
    ]
