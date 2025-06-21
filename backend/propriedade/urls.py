from django.urls import path
from . import views

urlpatterns = [
    path('propriedade', views.PropriedadeListCreateView.as_view(), name='propriedade-list-create'),
    path('propriedade/<int:pk>', views.PropriedadeDetailView.as_view(), name='propriedade-detail'),
]