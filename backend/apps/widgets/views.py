from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.mixins import RetrieveModelMixin
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from .models import Widget
from .serializers import (WidgetCreateSerializer, WidgetRetrieveSerializer,
                          WidgetsListSerializer, WidgetUpdateSerializer,
                          PublicDataSerializer, AnalyticUpdateSerializer,
                          AnalyticRetrieveSerializer)

from rest_framework.response import Response

from django.contrib.auth import get_user_model

from shared.plans.check_plan import check_plan_permission

from rest_framework.decorators import action


class WidgetViewSet(ModelViewSet):
    queryset = Widget.objects.all()
    serializer_class = WidgetRetrieveSerializer
    http_method_names = ('get', 'post', 'patch', 'delete')
    action_serializers = {
        'create': WidgetCreateSerializer,
        'list': WidgetsListSerializer,
        'retrieve': WidgetRetrieveSerializer,
        'partial_update': WidgetUpdateSerializer,
    }
    permission_classes = (IsAuthenticated,)

    @action(
        methods=['get'],
        detail=True,
        serializer_class=AnalyticRetrieveSerializer,
    )
    def analytics(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(instance)
        return Response(serializer.data)

    def get_queryset(self):
        return super().get_queryset().filter(user=self.request.user)

    def get_serializer_class(self):
        return self.action_serializers.get(self.action, self.serializer_class)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer_data = self.get_serializer(instance).data
        self.perform_destroy(instance)
        return Response(serializer_data, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        error = check_plan_permission(request.user, 'widgets')
        if error:
            return Response(error, status=status.HTTP_403_FORBIDDEN)
        return super().create(request, *args, **kwargs)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)


class PublicWidget(RetrieveModelMixin, GenericViewSet):
    permission_classes = (AllowAny,)
    queryset = Widget.objects.all()
    serializer_class = PublicDataSerializer
    lookup_field = 'slug'

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        try:
            plan = instance.user.userplan.plan
        except get_user_model().userplan.RelatedObjectDoesNotExist:
            plan = None

        serializer = self.get_serializer({'widget': instance, 'plan': plan})
        return Response(serializer.data)

    @swagger_auto_schema(responses={200: 'No content'})
    @action(
        detail=True,
        methods=['patch'],
        serializer_class=AnalyticUpdateSerializer,
        throttle_classes=[]
    )
    def analytics(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.serializer_class(data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        instance.increase_analytic_fields(serializer.validated_data)
        return Response(status=status.HTTP_200_OK)
