import uuid
from django.conf import settings

from yookassa import Configuration, Payment


Configuration.account_id = settings.YOOKASSA_SHOP_ID
Configuration.secret_key = settings.YOOKASSA_SECRET


def create_yookassa_payment(amount: int, description: str, return_url: str):
    return Payment.create({
        "amount": {
            "value": amount,
            "currency": "RUB"
        },
        "confirmation": {
            "type": "redirect",
            "return_url": return_url
        },
        "capture": True,
        "description": description
    }, uuid.uuid4())


def calculate_price(price: int, time_period: str):
    if time_period == 'month':
        return price

    if time_period == 'year':
        return (price * 12) * 0.8
