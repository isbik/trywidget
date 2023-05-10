from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('email/verify/<str:token>/', views.verify_email_view),
    path('password/recovery/', views.recovery_password),
    path('password/recovery/<str:token>/', views.verify_password_token),
    path('password/change/', views.change_password),
]
