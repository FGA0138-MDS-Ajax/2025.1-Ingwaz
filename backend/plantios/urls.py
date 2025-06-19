from django.urls import path
from .views import RegisterPlantio, ListPlantios

urlpatterns = [
	path('plantio', RegisterPlantio.as_view(), name='registerplantio'),
    path('list_plantio', ListPlantios.as_view(), name = 'listplantio') 

]