from django.urls import path
from event import views

urlpatterns = [
    path('create', views.CreateEventView.as_view()),
    path('user', views.GetUserEventsView.as_view()),
    path('image', views.LoadImageView.as_view()),
    path('get', views.GetEventView.as_view()),
    path('all', views.GetEventsView.as_view()),
    path('register/<str:id>', views.RegisterEventView.as_view()),
    path('delete/<str:id>', views.DeleteEventView.as_view()),
    path('like/<str:id>', views.LikeEventView.as_view()),
    path('special/<str:key>', views.GetSpecialInfoView.as_view()),
]
