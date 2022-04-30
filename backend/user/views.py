from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from user.serializers import LoginUserSerializer, RegisterUserSerializer, UserSerializer
from user.models import User
from rest_framework.authtoken.models import Token


# class AllUsersView(APIView):
#     # authentication_classes = [TokenAuthentication]
#     # permission_classes = [IsAuthenticated]

#     def get(self, request: Request):
#         content = {
#             'user': str(request.user),
#             'auth': str(request.auth),
#             'user.__class__': str(request.user.__class__),
#             'auth.__class__': str(request.auth.__class__)
#         }
#         return Response(content)


class AllUsersView(APIView):
    def get(self, request, *args, **kwargs):
        # data = UserSerializer()
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
    def get(self, request: Request):
        serializer = LoginUserSerializer(data=request.query_params)
        serializer.is_valid(raise_exception=True)
        token = serializer.save()
        return Response(data={
            'token': token.key
        })


class IdentifyUserView(APIView):
    def get(self, request: Request):
        serializer = UserSerializer(instance=Token.objects.get(
            key=request.query_params.get('token')).user)
        serializer.exclude('password', 'date_joined', 'groups')
        return Response(serializer.data)
