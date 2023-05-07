

from django.urls import path
from .views import FeedbackView


urlpatterns = [
    path('public/feedback', FeedbackView.as_view(), name='feedback'),

]
