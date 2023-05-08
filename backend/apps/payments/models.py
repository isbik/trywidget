from uuid import uuid4

from django.db import models
from django.contrib.auth import get_user_model

from apps.plans.models import TIME_PERIOD_CHOICES, Plans


class Payments(models.Model):
    payment_id = models.UUIDField(default=uuid4, editable=False, unique=True)
    price = models.IntegerField()
    time_period = models.IntegerField(choices=TIME_PERIOD_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_paid = models.BooleanField(default=False)

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE, related_name='payments',
    )

    plan = models.ForeignKey(
        Plans, on_delete=models.CASCADE, related_name="plans"
    )

    def __str__(self):
        return self.payment_id

    class Meta:
        db_table = 'payment'
