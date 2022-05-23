from rest_framework import serializers
from event.models import DescriptionImage, Event


class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = '__all__'


class UserEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        exclude = ('id', 'user')


class DescriptionImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DescriptionImage
        fields = '__all__'
