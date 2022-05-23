import datetime
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from event.models import DescriptionImage, Event
from event.serializers import DescriptionImageSerializer, EventSerializer, UserEventSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated

from user.models import User


class EventCreateView(CreateAPIView):
    serializer_class = EventSerializer
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
    serializer_class = UserEventSerializer
    queryset = Event.objects.all()

    def list(self, request, *args, **kwargs):
        self.queryset = self.get_queryset().filter(user=request.user)
        return super().list(request, *args, **kwargs)


class LoadDescriptionImageView(CreateAPIView):
    parser_classes = (MultiPartParser, FormParser, )
    serializer_class = DescriptionImageSerializer

    def create(self, request, *args, **kwargs):
        print(self.get_serializer().get_fields())
        request.data['user'] = request.query_params.get('user_id', None)
        response = super().create(request, *args, **kwargs)
        response.data = {'success': 1, 'file': {'url': response.data['image']}}
        return response
