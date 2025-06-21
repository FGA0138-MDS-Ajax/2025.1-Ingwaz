from django.urls import path
from .views import ApproveCreditView, DenyCreditView

urlpatterns = [
    path('approve/<int:credit_id>/', ApproveCreditView.as_view(), name='approve_credit'),
    path('deny/<int:credit_id>/', DenyCreditView.as_view(), name='deny_credit'),
]