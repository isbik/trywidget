from rest_framework import serializers

from .models import File


class FileInWidgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = File
        fields = ('id', 'url', 'size')
