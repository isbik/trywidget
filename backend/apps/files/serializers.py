from rest_framework import serializers

from .models import File


class FileInWidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('url', 'size', 'preview_image_url')


class FileListSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = (
            'id', 'url', 'size', 'preview_image_url', 'name', 'created_at'
        )
