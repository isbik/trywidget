from rest_framework import serializers
from django.contrib.auth import get_user_model

from apps.plans.serializers import PlanSerializer


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = "__all__"
        extra_kwargs = {'password': {'write_only': True}}


class UserMeSerializer(serializers.ModelSerializer):
    plan = PlanSerializer(source='userplan.plan', allow_null=True)

    class Meta:
        model = get_user_model()
        exclude = ('password',)
