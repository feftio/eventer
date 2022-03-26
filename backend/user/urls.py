from django.urls import path
from user import views

urlpatterns = [
    path('all', views.AllUsersView.as_view()),
    # path('register', views.RegisterUserView.as_view()),
    path('login', views.LoginUserView.as_view()),
    path('update', views.UpdateUserDataView.as_view())
]
