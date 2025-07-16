from django.urls import path

from .views import CropDetailView, DataUpdateView

urlpatterns = [
    path('calendario/update/', DataUpdateView.as_view(), name='update'),
    path('calendario/<slug:slug>/', CropDetailView.as_view(), name='crop-detail'),
]
