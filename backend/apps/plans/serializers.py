from rest_framework import serializers

from apps.plans.models import Plans


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = "__all__"


class PlanInPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        exclude = ('display_name', 'active', 'price')
