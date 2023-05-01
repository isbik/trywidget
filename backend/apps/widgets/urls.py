from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PublicWidget, WidgetViewSet

router_widgets = DefaultRouter()
router_widgets.register('', WidgetViewSet, basename='widgets')
router_widgets.register('public', PublicWidget, basename='public')

urlpatterns = [
    path('widgets/', include(router_widgets.urls)),
]
