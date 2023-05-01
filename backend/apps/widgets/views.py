from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from rest_framework.decorators import action
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.core.cache import cache, caches
from django.utils.cache import get_cache_key

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
        print(caches['default'].get('/widgets/2/public/'))
        serializer.save(user=self.request.user)

    @action(
        methods=('get',),
        detail=True,
        serializer_class=WidgetPublicSerializer,
        permission_classes=(AllowAny,),
        queryset=Widget.objects.all(),
        url_path='public',
    )
    def public(self, request, pk):
        return self.retrieve(request)
