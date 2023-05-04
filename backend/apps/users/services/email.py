from django.contrib.auth import get_user_model
from django.core.exceptions import ObjectDoesNotExist


def is_email_taken(email: str):
    return get_user_model().objects.filter(email=email).exists()


def get_user_by_verify_token(token: str):
    try:
        return get_user_model().objects.get(email_verify_token=token)
    except ObjectDoesNotExist:
        return
