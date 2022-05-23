from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from user.serializers import LoginUserSerializer, RegisterUserSerializer, UserSerializer
from user.models import User
from rest_framework.authtoken.models import Token


class AllUsersView(APIView):
    def get(self, request, *args, **kwargs):
        user = User.objects.get(pk=1)
        serializer = UserSerializer(instance=user)
        return Response(data=serializer.data)


class UpdateUserDataView(APIView):
    def get(self, request: Request):
        first_name = request.query_params.get('first_name', None)
        if first_name is None:
            return Response(data={'error': 'Nothing to update'})
        user = User.objects.get(pk=1)
        serializer = UserSerializer(
            instance=user, data={'first_name': first_name}, partial=True)
        serializer.is_valid(raise_exception=True)
        print(user._meta.fields[0].blank)
        return Response(UserSerializer(instance=user).data)


class RegisterUserView(CreateAPIView):
    serializer_class = RegisterUserSerializer


class LoginUserView(APIView):
    def post(self, request: Request, *args, **kwargs):
        serializer = LoginUserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.save()
        return Response({'token': token.key})


class IdentifyUserView(APIView):
    def get(self, request: Request):
        serializer = UserSerializer(instance=Token.objects.get(
            key=request.query_params.get('token')).user)
        serializer.exclude('password', 'date_joined',
                           'groups', 'is_active', 'user_permissions')
        return Response(serializer.data)
