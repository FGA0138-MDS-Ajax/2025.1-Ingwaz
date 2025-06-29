from django.urls import path
from .views import QuoteListView, QuoteUpdateView

urlpatterns = [
    path('quotes/', QuoteListView.as_view(), name='quote-list'),
    path('quotes/update/', QuoteUpdateView.as_view(), name='quote-update'),
]
