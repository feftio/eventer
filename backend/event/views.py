import datetime
from multiprocessing import AuthenticationError
from uuid import UUID
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, UpdateAPIView
from event.models import Event
from event import serializers
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated
from rest_framework import exceptions


class CreateEventView(CreateAPIView):
    serializer_class = serializers.EventSerializer
    parser_classes = (MultiPartParser, FormParser, )

    def prepare_data(self, request):
        request.data._mutable = True
        start_date = request.data.get('start_date', None)
        end_date = request.data.get('end_date', None)
        if (start_date is not None):
            request.data['start_date'] = datetime.datetime.fromtimestamp(
                int(start_date))
        if (end_date is not None):
            request.data['end_date'] = datetime.datetime.fromtimestamp(
                int(end_date))
        request.data['user'] = request.user
        request.data._mutable = False
        return request

    def create(self, request, *args, **kwargs):
        request = self.prepare_data(request)
        return super().create(request, *args, **kwargs)


class GetUserEventsView(ListAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = serializers.UserEventSerializer
    queryset = Event.objects.all()

    def list(self, request, *args, **kwargs):
        self.queryset = self.get_queryset().filter(user=request.user)
        return super().list(request, *args, **kwargs)


class GetEventView(APIView):
    def get(self, request, *args, **kwargs):
        if 'id' not in request.query_params:
            raise exceptions.NotFound()
        try:
            event = Event.objects.get(
                id=UUID(request.query_params['id']))
            serializer = serializers.EventSerializer(
                instance=event, context={"request": request})
            if serializer.data['active'] is False:
                raise exceptions.NotFound()
        except Exception:
            raise exceptions.NotFound()
        event.watched += 1
        event.save()
        return Response(serializer.data)


class GetEventsView(ListAPIView):
    authentication_classes = ()
    serializer_class = serializers.EventSerializer
    queryset = Event.objects.all()


class LoadImageView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, )
    serializer_class = serializers.ImageSerializer

    def create(self, request, *args, **kwargs):
        request.data['user'] = request.query_params.get('user_id', None)
        response = super().create(request, *args, **kwargs)
        response.data = {'success': 1, 'file': {'url': response.data['image']}}
        return response


class ChangeEventView(UpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = serializers.ChangeEventSerializer
    queryset = Event.objects.all()
    lookup_field = 'id'

    def put(self, request, *args, **kwargs):
        self.queryset = self.get_queryset().filter(user=request.user)
        return super().put(request, *args, **kwargs)
