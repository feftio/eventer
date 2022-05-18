from django.urls import path
from event import views

urlpatterns = [
    path('create', views.EventCreateView.as_view())
]
