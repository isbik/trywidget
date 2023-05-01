from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny

from .models import Widget
from .serializers import (WidgetCreateSerializer, WidgetPublicSerializer,
                          WidgetRetrieveSerializer, WidgetsListSerializer)


class WidgetViewSet(ModelViewSet):
    queryset = Widget.objects.all()
    serializer_class = WidgetCreateSerializer
    action_serializers = {
        'list': WidgetsListSerializer,
        'retrieve': WidgetRetrieveSerializer,
    }
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_class(self):
        return self.action_serializers.get(self.action, self.serializer_class)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
