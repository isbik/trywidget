from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PublicWidget, WidgetViewSet

router_widgets = DefaultRouter()
router_widgets.register('', WidgetViewSet, basename='widgets')

public_widgets = DefaultRouter()
public_widgets.register('widgets', PublicWidget, basename='public')

urlpatterns = [
    path('widgets/', include(router_widgets.urls)),
    path('public/', include(public_widgets.urls)),
]
