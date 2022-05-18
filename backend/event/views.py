from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.request import Request
from rest_framework.response import Response
from event.models import Event
from event.serializers import EventSerializer
from rest_framework.parsers import MultiPartParser, FormParser


class EventCreateView(CreateAPIView):
    serializer_class = EventSerializer
    parser_classes = (MultiPartParser, FormParser, )

    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)


class EventCreateEmptyView(CreateAPIView):
    def create(self, request, *args, **kwargs):
        print(request.data)
        return super().create(request, *args, **kwargs)
