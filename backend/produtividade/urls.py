from django.urls import path
from .views import ProdutividadeListCreate, ProdutividadeDetail

urlpatterns = [
    path('produtividades/', ProdutividadeListCreate.as_view(), name='produtividade-list'),
    path('produtividades/<int:pk>/', ProdutividadeDetail.as_view(), name='produtividade-detail'),
]
