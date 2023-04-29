import requests

from urllib.parse import urlencode
from rest_framework.decorators import api_view
from django.contrib.auth import get_user_model

from django.http import HttpRequest, HttpResponseBadRequest,  JsonResponse
from django.conf import settings


SCOPES = 'email profile'


@api_view(['GET'])
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

    token = data.get('access_token')
    email = user_data.get('email')
    picture = user_data.get('picture')

    # TODO using email create user and then create oauth, also good to add errors handing

    return JsonResponse({'data': data, 'user': user_data})


@api_view(['POST'])
def login(request: HttpRequest):
    email = request.POST['email']
    password = request.POST['password']

    return JsonResponse({'data': 'login'})


@api_view(['POST'])
def register(request: HttpRequest):

    User = get_user_model()

    email = request.data['email']
    password = request.data['password']

    found = User.objects.filter(email=email)
    if found:
        error = {
            "detail": 'Пользователь с email {} уже существует'.format(email)}
        return HttpResponseBadRequest(JsonResponse(error))

    User.objects.create_user(email=email, password=password)

    return JsonResponse({'data': 'ok'})
