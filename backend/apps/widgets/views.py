from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated

from .models import Widget
from .serializers import (WidgetCreateSerializer, WidgetPublicSerializer,
                          WidgetRetrieveSerializer, WidgetsListSerializer,
                          WidgetUpdateSerializer)


class WidgetViewSet(ModelViewSet):
    queryset = Widget.objects.all()
    serializer_class = WidgetCreateSerializer
    action_serializers = {
        'create': WidgetCreateSerializer,
        'list': WidgetsListSerializer,
        'retrieve': WidgetRetrieveSerializer,
        'update': WidgetUpdateSerializer,
    }
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_class(self):
        return self.action_serializers.get(self.action, self.serializer_class)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
