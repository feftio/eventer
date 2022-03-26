from dataclasses import fields
from rest_framework import serializers
from user.models import User


class UserSerializer(serializers.ModelSerializer):
    # def update(self, instance, validated_data):
    #     instance.first_name = validated_data.first_name
    #     instance.save()
    #     return instance

    class Meta:
        model = User
        fields = '__all__'
