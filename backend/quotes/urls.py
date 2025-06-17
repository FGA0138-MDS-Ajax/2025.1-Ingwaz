from django.urls import path
from .views import QuotesDetailView, QuotesListView

urlpatterns = [
    path('quotes', QuotesListView.as_view(), name='list-quotes'), 
	path('quote', QuotesDetailView.as_view(), name='get-quote'), 
]