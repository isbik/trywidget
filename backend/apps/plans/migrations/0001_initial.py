# Generated by Django 4.2 on 2023-04-30 13:04

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
            name='Plans',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('display_name', models.CharField(max_length=56)),
                ('price', models.IntegerField()),
                ('save', models.IntegerField()),
                ('max_widgets', models.IntegerField()),
                ('is_hide_logo', models.BooleanField()),
                ('is_support', models.BooleanField()),
                ('active', models.BooleanField(db_index=True)),
            ],
        ),
        migrations.CreateModel(
            name='UserPlan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('time_period', models.IntegerField(choices=[(1, 'month'), (2, 'year')])),
                ('plan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='plans.plans')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
