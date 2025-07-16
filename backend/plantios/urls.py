from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PlantioViewSet

router = DefaultRouter()

router.register(r'plantios', PlantioViewSet, basename='plantio')

urlpatterns = [
    path('', include(router.urls)),
]
