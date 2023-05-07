from rest_framework import viewsets

from apps.plans.models import Plans
from apps.plans.serializers import PlanSerializer
from rest_framework.response import Response


class PlanViewSet(viewsets.ViewSet):
    queryset = Plans.objects.filter(active=True)
    serializer_class = PlanSerializer

    def list(self, request):
        queryset = Plans.objects.filter(active=True).order_by('price')
        serializer = PlanSerializer(queryset, many=True)
        return Response(serializer.data)
