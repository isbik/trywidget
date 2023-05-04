from rest_framework import serializers

from .models import File


class FileSerializer(serializers.ModelSerializer):
    url = serializers.URLField(source='get_url')
    preview_image_url = serializers.URLField(source='get_preview_image_url')

    class Meta:
        model = File
        fields = (
            'id',
            'name',
            'url',
            'size',
            'preview_image_url',
            'created_at',
        )


class FileInWidgetSerializer(FileSerializer):

    class Meta:
        model = File
        fields = ('id', 'name', 'url', 'size', 'preview_image_url')
