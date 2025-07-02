from django.urls import path
from .views import PropriedadeListCreateView, PropriedadeDetailView

urlpatterns = [
    path('propriedade/', PropriedadeListCreateView.as_view(), name='propriedade-list-create'),
    path('propriedade/<int:pk>/', PropriedadeDetailView.as_view(), name='propriedade-detail'),
]