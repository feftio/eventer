from rest_framework import serializers
from event import models
from user.serializers import UserSerializer


class EventSerializer(serializers.ModelSerializer):
    active = serializers.BooleanField(initial=True, default=True)

    class Meta:
        model = models.Event
        fields = '__all__'


class UserEventSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = models.Event
        fields = '__all__'


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Image
        fields = '__all__'


class ChangeEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        exclude = ('tags', 'user')