from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.renderers import JSONRenderer
from user import serializers

from user.serializers import UserSerializer
from user.models import User


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


class LoginUserView(APIView):
    def post(self, request, *args, **kwargs):
        pass


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
        serializer = UserSerializer(instance=user, data={'first_name': first_name}, partial=True)
        serializer.is_valid(raise_exception=True)
        print(user._meta.fields[0].blank)
        return Response(UserSerializer(instance=user).data)
