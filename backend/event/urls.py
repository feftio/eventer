from django.urls import path
from event import views

urlpatterns = [
    path('create', views.CreateEventView.as_view()),
    path('user', views.GetUserEventsView.as_view()),
    path('image', views.LoadImageView.as_view()),
    path('get', views.GetEventView.as_view()),
    path('all', views.GetEventsView.as_view()),
    path('change/<str:id>', views.ChangeEventView.as_view()),
]
