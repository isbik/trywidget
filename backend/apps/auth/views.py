from django.shortcuts import redirect
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import generics
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.sessions.models import Session
import settings

from apps.users.services.email import get_user_by_verify_token
from .serializer import UserSerializer


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


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    session = request.COOKIES.get('sessionid')
    Session.objects.filter(session_key=session).delete()

    logout(request)

    return HttpResponse({"data": "ok"})


class RegisterView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    permission_classes = []
    serializer_class = UserSerializer

    def post(self, *args, **kwargs):
        super().post(*args, **kwargs)
        return redirect("{}/app".format(settings.CLIENT_URL))


@api_view(['GET'])
def verify_email_view(request, token):
    user = get_user_by_verify_token(token)
    if user is None:
        return redirect("{}/error?type=invalid_token".format(settings.CLIENT_URL))
    user.is_active = True
    user.email_verify_token = ''
    user.save()
    
    login(request, user)

    return redirect("{}/app".format(settings.CLIENT_URL))
