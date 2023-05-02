from django.contrib.auth import get_user_model


def is_email_taken(email: str):
    return get_user_model().objects.filter(email=email).exists()
