from django.urls import path
from .views import QuoteUpdateView, QuoteListFilteredView, QuoteListView

urlpatterns = [
    path('quotes/update', QuoteUpdateView.as_view(), name='update-quotes'), 
    path('quote', QuoteListFilteredView.as_view(), name='get-quote'), 
	path('quotes', QuoteListView.as_view(), name='list-quotes'), 
]