from django.contrib import admin
from django.urls import path, include
from .yasg import urlpatterns as yasg_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.auth.urls')),
    path('users/', include('apps.users.urls')),
    path('files/', include('apps.files.urls')),
    path('oauth/', include('apps.oauth.urls')),
    path('', include('apps.widgets.urls')),
]

urlpatterns += yasg_urlpatterns