from django.urls import path
from . import views

urlpatterns = [
    path('google', views.google, name='google oauth'),
    path('google/callback', views.google_callback, name='google oauth callback'),
]
