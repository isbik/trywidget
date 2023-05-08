from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from apps.users.serializer import UserSerializer
from apps.plans.serializers import PlanSerializer


class UserMeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        response_data = user_serializer.data

        try:
            plan = user.userplan.plan
            plan_serializer = PlanSerializer(plan)
            response_data['plan'] = plan_serializer.data
        except:
            response_data['plan'] = None

        return Response(response_data)
