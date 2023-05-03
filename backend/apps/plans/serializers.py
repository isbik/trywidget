from rest_framework import serializers

from apps.plans.models import Plans


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plans
        fields = "__all__"
