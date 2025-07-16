from django.urls import path

from . import views

urlpatterns = [
    path('users/register/', views.RegisterView.as_view(), name='register'),
    path('users/login/', views.LoginView.as_view(), name='login'),
    path('users/', views.UserListView.as_view(), name='list-users'),
    path('users/forgot/', views.PasswordForgotView.as_view(), name='forgot-password'),
    path('users/info/', views.UserInfoView.as_view(), name='user-info'),
]
