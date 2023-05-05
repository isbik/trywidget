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
from drf_yasg.utils import swagger_auto_schema
from uuid import uuid4

from apps.users.services.email import get_user_by_verify_token, get_user_by_email, get_user_by_password_token
from .serializer import UserSerializer, Email, Password
from apps.emails.services.token import send_token


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
    return Response(status=200)


@swagger_auto_schema(method='POST', request_body=Email())
@api_view(['POST'])
def recovery_password(request):
    email = request.data.get('email')
    user = get_user_by_email(email)
    if user is None:
        return redirect("{}/error?type=user_not_found".format(settings.CLIENT_URL))

    token = uuid4()
    user.password_token = token
    user.save()
    send_token(email, token)

    return redirect(f'{settings.CLIENT_URL}/app')


@swagger_auto_schema(method='POST', request_body=Password())
@api_view(['POST'])
def verify_password_token(request, token):
    serializer = Password(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = get_user_by_password_token(token)
    if user is None:
        return redirect(f'{settings.CLIENT_URL}/error?message=invalid_token')

    user.set_password(request.data.get('password'))
    user.password_token = ''
    user.save()
    return redirect(f'{settings.CLIENT_URL}/password/change/')
