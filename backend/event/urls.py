from django.urls import path
from event import views

urlpatterns = [
    path('create', views.EventCreateView.as_view()),
    path('userall', views.GetAllUserEventsView.as_view()),
    path('load_description_image', views.LoadDescriptionImage.as_view()),
]
