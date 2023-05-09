from django.db import models
from django.contrib.auth import get_user_model


TIME_PERIOD_CHOICES = (
    ('month', 'month'),
    ('year', 'year'),
)


class Plan(models.Model):

    display_name = models.CharField(max_length=56)
    price = models.IntegerField()

    # options
    max_widgets = models.IntegerField()
    is_hide_logo = models.BooleanField()
    is_support = models.BooleanField()

    active = models.BooleanField(db_index=True)

    def __str__(self):
        return self.display_name

    class Meta:
        db_table = 'plan'


class UserPlan(models.Model):
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    plan = models.ForeignKey(Plan, on_delete=models.CASCADE)
    time_period = models.CharField(choices=TIME_PERIOD_CHOICES)

    class Meta:
        db_table = 'user_plan'
