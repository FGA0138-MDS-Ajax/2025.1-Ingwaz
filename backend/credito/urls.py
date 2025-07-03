from django.urls import path
from .views import RegisterView, AvaliarView, SolicitacaoCreditoListView, AprovarSolicitacaoView, RejeitarSolicitacaoView

urlpatterns = [
    path('solicitacoes/register/', RegisterView.as_view(), name='solicitacao-register'),
    path('solicitacoes/<int:solicitacao_id>/avaliar/', AvaliarView.as_view(), name='solicitacao-avaliar'),
    path('solicitacoes/', SolicitacaoCreditoListView.as_view(), name='solicitacao-list'),
    path('solicitacoes/<int:solicitacao_id>/aprovar/', AprovarSolicitacaoView.as_view(), name='solicitacao-list'),
    path('solicitacoes/<int:solicitacao_id>/rejeitar/', RejeitarSolicitacaoView.as_view(), name='solicitacao-list'),
]