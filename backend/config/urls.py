from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

import settings
from .yasg import urlpatterns as yasg_urlpatterns

urlpatterns = [
    path('admin/', admin.site.urls),
    path('auth/', include('apps.auth.urls')),
    path('users/', include('apps.users.urls')),
    path('files/', include('apps.files.urls')),
    path('oauth/', include('apps.oauth.urls')),
    path('', include('apps.widgets.urls')),
    path('plans/', include('apps.plans.urls')),
    path('', include('apps.feedback.urls')),
    path('payments/', include('apps.payments.urls')),
]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL, document_root=settings.MEDIA_ROOT
    )

urlpatterns += yasg_urlpatterns
