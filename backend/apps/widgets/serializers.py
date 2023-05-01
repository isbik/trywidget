from rest_framework import serializers

from ..files.serializers import FileInWidgetSerializer
from .models import Widget


class WidgetBaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Widget
        fields = (
            'id',
            'name',
            'preview_image_url',
            'video',
            'updated_at',
            'created_at',
            'settings',
        )


class WidgetRetrieveSerializer(WidgetBaseSerializer):
    video = FileInWidgetSerializer()


class WidgetPublicSerializer(WidgetRetrieveSerializer):
    class Meta(WidgetRetrieveSerializer.Meta):
        exclude = ('id', 'updated_at', 'created_at')


class WidgetsListSerializer(WidgetBaseSerializer):
    class Meta(WidgetBaseSerializer.Meta):
        fields = ('id', 'name', 'preview_image_url')


class WidgetCreateSerializer(WidgetBaseSerializer):
    class Meta(WidgetBaseSerializer.Meta):
        fields = ('name', 'video')
