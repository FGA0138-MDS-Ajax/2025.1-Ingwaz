from django.urls import path
from .views import WeatherListView, WeatherDetailView

urlpatterns = [
    # Endpoint para a lista de previsões da semana de uma propriedade
    path('weather/<int:propriedade_id>/', WeatherListView.as_view(), name='weather-list-for-property'),
    
    # Endpoint para a previsão de um dia específico de uma propriedade
    path('weather/<int:propriedade_id>/<str:data>/', WeatherDetailView.as_view(), name='weather-detail-for-property'),
]