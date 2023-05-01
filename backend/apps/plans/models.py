from django.db import models
from django.contrib.auth import get_user_model


class Plans(models.Model):

    display_name = models.CharField(max_length=56)
    price = models.IntegerField()
    save = models.IntegerField()
    max_widgets = models.IntegerField()
    is_hide_logo = models.BooleanField()
    is_support = models.BooleanField()
    active = models.BooleanField(db_index=True)

    def __str__(self):
        return self.display_name


class UserPlan(models.Model):
    time_period_choices = (
        (1, 'month'),
        (2, 'year'),
    )
    user = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    plan = models.ForeignKey(Plans, on_delete=models.CASCADE)
    time_period = models.IntegerField(choices=time_period_choices)
