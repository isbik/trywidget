from rest_framework import serializers

from apps.plans.models import Plan


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = "__all__"


class PlanInPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        exclude = ('display_name', 'active', 'price')
