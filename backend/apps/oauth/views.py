import requests

from urllib.parse import urlencode
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model, login
from django.http import HttpRequest
from django.conf import settings
from django.shortcuts import redirect

from apps.oauth.models import OAuth


SCOPES = 'email profile'


@api_view(['GET'])
def google(request: HttpRequest):
    url = "https://accounts.google.com/o/oauth2/v2/auth"

    redirect_uri = request.build_absolute_uri('/') + "oauth/google/callback"
    params = {
        "response_type": "code",
        "redirect_uri":  redirect_uri,
        "scope": SCOPES,
        "client_id": settings.GOOGLE_CLIENT_ID
    }

    return redirect("{}?{}".format(url, urlencode(params)))


@api_view(['GET'])
def google_callback(request: HttpRequest):
    code = request.GET.get('code')

    params = {
        'code': code,
        'client_id': settings.GOOGLE_CLIENT_ID,
        'client_secret': settings.GOOGLE_CLIENT_SECRET,
        'scope': SCOPES,
        'grant_type': 'authorization_code',
        'redirect_uri': request.build_absolute_uri('/') + "oauth/google/callback"
    }

    response = requests.post(
        'https://oauth2.googleapis.com/token', params=params)

    data = response.json()

    user_data = {}

    if 'access_token' in data:
        params = {'access_token': data['access_token']}
        user_response = requests.get(
            'https://openidconnect.googleapis.com/v1/userinfo', params=params)

        user_data = user_response.json()

    email = user_data.get('email')

    user = get_user_model().objects.filter(email=email).first()

    if not user:
        picture = user_data.get('picture')
        user = get_user_model().objects.create_user(
            email=email,
        )
        user.picture = picture
        user.save()

        oauth = OAuth(
            user=user,
            provider_id=data.get('id'),
            provider_name='google',
            access_token=data.get('access_token'),
            username=data.get('name'),
            auth_profile=data,
        )

        oauth.save()

    login(request, user)

    return redirect("{}/app".format(settings.CLIENT_URL))
