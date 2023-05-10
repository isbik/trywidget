from django.shortcuts import redirect
from drf_yasg import openapi
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from django.contrib.auth import get_user_model, authenticate, login, logout
from rest_framework import generics
from django.http import HttpRequest, HttpResponse, JsonResponse
from rest_framework.permissions import IsAuthenticated
from django.contrib.sessions.models import Session
import settings
from drf_yasg.utils import swagger_auto_schema
from uuid import uuid4

from apps.users.services.email import get_user_by_verify_token, get_user_by_email, get_user_by_password_token
from .serializer import UserSerializer, Email, Password, ChangePasswordSerializer, LoginSerializer
from apps.emails.services.token import send_token
from shared.errors import wrong_data_error, user_not_found_error, invalid_token_error

data_ok_schema = openapi.Schema(
    type=openapi.TYPE_OBJECT,
    properties={'data': openapi.Schema(type=openapi.TYPE_STRING)},
)


@swagger_auto_schema(
    method='POST',
    request_body=LoginSerializer(),
    responses={200: data_ok_schema}
)
@api_view(['POST'])
def login_view(request: HttpRequest):
    email = request.data.get('email', None)
    password = request.data.get('password', None)

    user = authenticate(request, username=email, password=password)

    if user is None:
        return JsonResponse(wrong_data_error, status=status.HTTP_401_UNAUTHORIZED)

    login(request, user)

    return JsonResponse({'data': 'ok'}, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method='GET',
    responses={200: data_ok_schema}
)
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

    @swagger_auto_schema(responses={200: data_ok_schema})
    def post(self, *args, **kwargs):
        super().post(*args, **kwargs)
        return HttpResponse({"data": "ok"})


@api_view(['GET'])
def verify_email_view(request, token):
    user = get_user_by_verify_token(token)
    if user is None:
        return redirect("{}/error?type=invalid_token".format(settings.CLIENT_URL))

    user.is_active = True
    user.email_verify_token = ''
    user.save()

    login(request, user)

    return HttpResponse(status=200)


@swagger_auto_schema(
    method='POST',
    request_body=Email(),
    responses={200: data_ok_schema},
)
@api_view(['POST'])
def recovery_password(request):
    email = request.data.get('email')
    user = get_user_by_email(email)

    if user is None:
        return JsonResponse(user_not_found_error, status=status.HTTP_404_NOT_FOUND)

    token = uuid4()
    user.password_token = token
    user.save()

    url = f'{settings.CLIENT_URL}/password/recovery/{token}'

    send_token(email, 'Восстановление пароля', 'recovery.html', url=url)

    return JsonResponse({"data": "ok"}, status=200)


@swagger_auto_schema(
    method='POST',
    request_body=Password(),
    responses={200: data_ok_schema},
)
@api_view(['POST'])
def verify_password_token(request, token):
    serializer = Password(data=request.data)
    serializer.is_valid(raise_exception=True)

    user = get_user_by_password_token(token)
    if user is None:
        return JsonResponse(invalid_token_error, status=status.HTTP_400_BAD_REQUEST)

    user.set_password(request.data.get('password'))
    user.password_token = ''
    user.save()

    return JsonResponse({"data": "ok"}, status=200)


@swagger_auto_schema(
    method='POST',
    request_body=ChangePasswordSerializer(),
    responses={
        200: data_ok_schema,
        401: openapi.Schema(type=openapi.TYPE_OBJECT, properties={'detail': openapi.Schema(type=openapi.TYPE_STRING)})
    },
)
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    serializer = ChangePasswordSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)

    new_password = request.data.get('new_password')
    old_password = request.data.get('old_password')

    user = request.user

    if user.check_password(old_password):
        user.set_password(new_password)
        user.save()
        login(request, user)
        return JsonResponse({'status': 'ok'}, status=200)
    return JsonResponse({'detail': 'invalid password'}, status=401)
