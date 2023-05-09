from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

file_router = DefaultRouter()
file_router.register('', views.ListDeleteFileViewSet, basename='file')

urlpatterns = [
    path('upload/', views.upload, name='upload'),
    path('', include(file_router.urls))
]
