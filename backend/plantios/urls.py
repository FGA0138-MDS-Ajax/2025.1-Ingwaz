from django.urls import path
from .views import RegisterPlantio 

urlpatterns = [
	path('plantio', RegisterPlantio.as_view(), name='registerplantio'), 

]