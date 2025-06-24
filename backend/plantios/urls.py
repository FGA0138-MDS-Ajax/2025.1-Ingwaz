from django.urls import path
from .views import PlantioListCreateView

urlpatterns = [
	path('plantios/', PlantioListCreateView.as_view(), name='plantio-list-create'),
]