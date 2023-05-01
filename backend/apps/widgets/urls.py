from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import WidgetViewSet

router_widgets = DefaultRouter()
router_widgets.register('', WidgetViewSet, basename='widgets')

urlpatterns = [
    path('', include(router_widgets.urls)),
]
