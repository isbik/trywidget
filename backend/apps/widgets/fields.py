from rest_framework import serializers


class PrimaryKeyUserRelatedField(serializers.PrimaryKeyRelatedField):
    def get_queryset(self):
        return self.queryset.filter(user=self.context['request'].user)
