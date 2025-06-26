from django.urls import path
from .views import RegisterView, UserListView, LoginView

urlpatterns = [
	path('register', RegisterView.as_view(), name='register'), 
    path('login', LoginView.as_view(), name='login'),
    path('users', UserListView.as_view(), name='list-users')
]