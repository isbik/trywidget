

from rest_framework.routers import DefaultRouter
from .views import PlanViewSet


router = DefaultRouter()
router.register('', PlanViewSet, basename='plans')

urlpatterns = router.urls
