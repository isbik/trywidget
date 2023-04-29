from urllib.parse import urlencode
import requests

from django.http import HttpRequest,  JsonResponse
from django.conf import settings


SCOPES = 'email profile'


def google(request: HttpRequest):
    url = "https://accounts.google.com/o/oauth2/v2/auth"
    params = {
        "response_type": "code",
        # "redirect_uri":  request.build_absolute_uri(
        #     '/') + "oauth/google/callback",
        "redirect_uri":  "http://localhost:8000/oauth/google/callback",
        "scope": SCOPES,
        "client_id": settings.GOOGLE_CLIENT_ID
    }

    

    return JsonResponse({'link': "{}?{}".format(url, urlencode(params))})


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

    token = data.get('access_token')
    email = user_data.get('email')
    picture = user_data.get('picture')

    # TODO using email create user and then create oauth, also good to add errors handing

    return JsonResponse({'data': data, 'user': user_data})
