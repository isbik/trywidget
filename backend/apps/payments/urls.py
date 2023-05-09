from .views import create_payment_view, yookassa_payment_hook
from django.urls import path


urlpatterns = [
    path('', create_payment_view, name='create_payment_view'),
    path('yookassa/', yookassa_payment_hook, name='yookassa_payment_hook'),
]
