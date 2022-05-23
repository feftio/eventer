from django.urls import path
from event import views

urlpatterns = [
    path('create', views.EventCreateView.as_view()),
    path('user_events', views.GetUserEventsView.as_view()),
    path('load_desc_image', views.LoadDescriptionImageView.as_view()),
]
