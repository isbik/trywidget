import requests

from urllib.parse import urlencode
from rest_framework.decorators import api_view
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate, login
from rest_framework import generics
from django.http import HttpRequest, JsonResponse
from django.conf import settings
from django.shortcuts import redirect

from .serializer import UserSerializer


SCOPES = 'email profile'


@api_view(['GET'])
def google(request: HttpRequest):
    url = "https://accounts.google.com/o/oauth2/v2/auth"

    redirect_uri = request.build_absolute_uri('/') + "oauth/google/callback"
    params = {
        "response_type": "code",
        "redirect_uri":  redirect_uri,
        "redirect_uri":  "http://localhost:8000/oauth/google/callback",
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
        login(request, user)

        # ADD CREATE OAUTH DATA
        google_oauth_token = data.get('access_token')

    login(request, user)
    return redirect("{}/app".format(settings.CLIENT_URL))


@api_view(['POST'])
def login_view(request: HttpRequest):
    email = request.data.get('email', None)
    password = request.data.get('password', None)

    user = authenticate(request, username=email, password=password)
    if user is None:
        return JsonResponse({'detail': 'Неверный данные'}, status=status.HTTP_401_UNAUTHORIZED)

    if user.is_active:
        login(request, user)
        return JsonResponse({'message': 'Login successful'}, status=status.HTTP_200_OK)
    else:
        return JsonResponse({'detail': 'Пользователь заблокирован'}, status=status.HTTP_401_UNAUTHORIZED)


class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = []
    serializer_class = UserSerializer
