from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('apps.users.urls')),
    path('files/', include('apps.files.urls')),
    path('oauth/', include('apps.oauth.urls')),
]
