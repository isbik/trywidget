from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from apps.users.serializer import UserMeSerializer


class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    @swagger_auto_schema(responses={200: UserMeSerializer()})
    def get(self, request):
        user = request.user
        user_serializer = UserMeSerializer(user)
        return Response(user_serializer.data)
