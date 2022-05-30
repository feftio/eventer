from rest_framework import serializers, exceptions
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


class DeleteEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('id', )

    def update(self, instance, validated_data):
        instance.active = False
        instance.save()
        return instance


class LikeEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Event
        fields = ('liked', )

    def update(self, instance, validated_data):
        username = self.context['request'].user.username
        if username in instance.liked or instance.user.username == username:
            raise exceptions.PermissionDenied("You cannot like this event.")
        instance.liked.append(username)
        instance.save()
        return instance


class RegisterEventSerializer(serializers.Serializer):
    name = serializers.CharField()
    email = serializers.EmailField()
    contacts = serializers.CharField()

    class Meta:
        fields = '__all__'

    def create(self, instance):
        instance.registered.append(self.validated_data)
        instance.save()
        return instance
