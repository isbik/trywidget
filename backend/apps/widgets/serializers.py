from rest_framework import serializers

from ..files.models import File
from ..files.serializers import FileInWidgetSerializer
from .models import Widget
from .fields import PrimaryKeyUserRelatedField
from ..plans.serializers import PlanInPublicSerializer


class WidgetBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = (
            'id',
            'slug',
            'name',
            'video',
            'updated_at',
            'created_at',
            'settings',
        )


class WidgetRetrieveSerializer(WidgetBaseSerializer):
    video = FileInWidgetSerializer()


class WidgetPublicSerializer(WidgetRetrieveSerializer):
    class Meta(WidgetRetrieveSerializer.Meta):
        fields = ('name', 'video', 'settings')


class WidgetsListSerializer(WidgetRetrieveSerializer):
    class Meta(WidgetBaseSerializer.Meta):
        fields = ('id', 'name', 'video', 'slug')


class WidgetCreateSerializer(WidgetBaseSerializer):
    class Meta(WidgetBaseSerializer.Meta):
        fields = ('id', 'name', 'video')


class WidgetUpdateSerializer(WidgetBaseSerializer):
    video_id = PrimaryKeyUserRelatedField(
        source='video', queryset=File.objects, allow_null=True
    )

    class Meta(WidgetBaseSerializer.Meta):
        fields = ('id', 'name', 'video_id', 'settings')

    def update(self, instance, validated_data):
        instance.settings = {
            **instance.settings,
            **validated_data.pop('settings', dict()),
        }
        return super().update(instance, validated_data)


class PublicDataSerializer(serializers.Serializer):
    widget = WidgetPublicSerializer()
    plan = PlanInPublicSerializer(allow_null=True)

    class Meta:
        fields = ('widget', 'plan')
