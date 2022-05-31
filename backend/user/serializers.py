import uuid
from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from user import models
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = '__all__'

    def exclude(self, *fields: tuple) -> None:
        setattr(self.Meta, 'fields', None)
        setattr(self.Meta, 'exclude', fields)


class RegisterUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
        validators=[UniqueValidator(queryset=models.User.objects.all())],
    )
    email = serializers.EmailField(
        required=True,

    )
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password]
    )

    class Meta:
        model = models.User
        fields = ('username', 'email', 'password', )

    def create(self, validated_data):
        user = models.User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        models.EditorSetting.objects.create(user=user)
        return user


class LoginUserSerializer(serializers.ModelSerializer):
    username = serializers.CharField(
        required=True,
    )
    password = serializers.CharField(
        write_only=True,
        required=True,
    )

    def create(self, validated_data):
        user = validated_data.get('user', None)
        if Token.objects.filter(user=user).exists():
            token = Token.objects.get(user=user)
        else:
            token = Token.objects.create(user=user)
        return token

    def validate(self, attrs):
        username = attrs.get('username', None)
        password = attrs.get('password', None)
        user = authenticate(username=username, password=password)
        if user is None:
            raise serializers.ValidationError(
                'A user with this username and password is not found.'
            )
        attrs['user'] = user
        return super().validate(attrs)

    class Meta:
        model = models.User
        fields = ('username', 'password', )


class GetEditorSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EditorSetting
        fields = '__all__'


class ChangeEditorSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.EditorSetting
        fields = ('value', )
