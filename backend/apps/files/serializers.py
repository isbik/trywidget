from rest_framework import serializers

from .models import File


class FileInWidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = (
            'id',
            'name',
            'created_at',
            'get_url',
            'size',
            'get_preview_image_url',
        )


class FileSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = (
            'id',
            'get_url',
            'size',
            'get_preview_image_url',
            'name',
            'created_at',
        )
