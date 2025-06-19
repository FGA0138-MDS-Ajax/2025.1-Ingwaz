from django.urls import path
from .views import AvaliarView, RegisterView

urlpatterns = [
    path('credito/avaliar/<int:solicitacao_id>/', AvaliarView.as_view(), name='avaliar_credito'),
    path('credito/avaliar/', RegisterView.as_view(), name='registrar_solicitacao'),
]