from django.urls import path
from .views import QuoteUpdateView, QuoteListFilteredView, QuoteListView

urlpatterns = [
    path('quote', QuoteListFilteredView.as_view(), name='get-quote'), 
	path('list_quotes', QuoteListView.as_view(), name='list-quotes'), 
    path('update_quotes', QuoteUpdateView.as_view(), name='update-quotes'), 
]