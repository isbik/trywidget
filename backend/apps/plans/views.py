from drf_yasg.utils import swagger_auto_schema
from rest_framework import viewsets

from apps.plans.models import Plan
from apps.plans.serializers import PlanSerializer
from rest_framework.response import Response


class PlanViewSet(viewsets.ViewSet):
    queryset = Plan.objects.filter(active=True)
    serializer_class = PlanSerializer

    @swagger_auto_schema(responses={200: PlanSerializer(many=True)})
    def list(self, request):
        queryset = Plan.objects.filter(active=True).order_by('price')
        serializer = PlanSerializer(queryset, many=True)
        return Response(serializer.data)
