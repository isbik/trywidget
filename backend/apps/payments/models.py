from uuid import uuid4

from django.db import models
from django.contrib.auth import get_user_model

from apps.plans.models import TIME_PERIOD_CHOICES, Plan


class Payments(models.Model):
    payment_id = models.UUIDField(default=uuid4, editable=False, unique=True)
    internal_payment_id = models.CharField(max_length=256)
    price = models.IntegerField()
    time_period = models.CharField(choices=TIME_PERIOD_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE, related_name='payments',
    )

    plan = models.ForeignKey(
        Plan, on_delete=models.CASCADE, related_name="plans"
    )

    class Meta:
        db_table = 'payment'
