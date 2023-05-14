from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from apps.payments.models import Payments
from apps.plans.models import Plan
from apps.users.models import User
from apps.plans.models import UserPlan
from datetime import datetime, timedelta

from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from django.shortcuts import get_object_or_404

data_ok_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={'payment_id': openapi.Schema(type=openapi.TYPE_STRING)},
)


@swagger_auto_schema(
    method='POST',
    responses={201: data_ok_schema}
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_payment_view(request):
    # user can have only unpaid payment
    plan = get_object_or_404(Plan, id=request.data['plan_id'])

    payment, created = Payments.objects.get_or_create(
        user=request.user,
        price=plan.price,
        time_period=request.data['time_period'],
        plan=plan,
        is_paid=False,
    )

    payment.save()

    return JsonResponse({"payment_id": payment.payment_id})


@api_view(['POST'])
@permission_classes([])
def yookassa_payment_hook(request):

    object = request.data['object']

    payment_id = object['id']
    is_paid = object['paid']

    payment = get_object_or_404(Payments, payment_id=payment_id, is_paid=False)
    payment.is_paid = is_paid
    payment.save()

    user_plan = UserPlan.objects.create(
        user=payment.user,
        plan=payment.plan,
        time_period=payment.time_period,
    )

    user_plan.save()

    user = User.objects.get(id=payment.user.id)

    if payment.time_period == 'month':
        user.next_payment_date = datetime.now() + timedelta(days=30)

    if payment.time_period == 'year':
        user.next_payment_date = datetime.now() + timedelta(days=365)

    user.save()

    return JsonResponse({"data": "ok"})
