from django.urls import path
from .views import RegisterPlantio, ListPlantios

urlpatterns = [
	path('plantios', RegisterPlantio.as_view(), name='plantio-list-create'),
	path('list_plantio', ListPlantios.as_view(), name = 'listplantio') 	
 
]