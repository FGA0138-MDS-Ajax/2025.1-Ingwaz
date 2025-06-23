import pytest
from quotes.models import Quote
from rest_framework import serializers
from quotes.serializers import QuoteSerializer

@pytest.mark.django_db
def test_criacao_cotacao():
    cotacao = Quote.objects.create(name="Milho", value=50.0)
    assert cotacao.name == "Milho"
    assert cotacao.value == 50.0

@pytest.mark.django_db
def test_string_cotacao():
    cotacao = Quote.objects.create(
        date='2024-10-17',
        name='Soja',
        unity='reais',
        value=70
    )
    assert str(cotacao) == 'Soja em 2024-10-17 - R$ 70'

@pytest.mark.django_db
def test_campos_vazios():
    dados = {
        'date': '',
        'name': '',
        'unity': '',
        'value': ''
    }
    serializer = QuoteSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'date' in serializer.errors
    assert 'name' in serializer.errors
    assert 'unity' in serializer.errors
    assert 'value' in serializer.errors

@pytest.mark.django_db
def test_valor_formato_incorreto():
    dados = {
        'date': '2025-03-04',
        'name': 'arroz',
        'unity': 'kg',
        'value': '150.7582'
    }
    serializer = QuoteSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'value' in serializer.errors

@pytest.mark.django_db
def test_valor_nao_numerico():
    dados = {
        'date': '2025-03-04',
        'name': 'arroz',
        'unity': 'kg',
        'value': 'bem alto'
    }
    serializer = QuoteSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'value' in serializer.errors

@pytest.mark.django_db
def test_atualizacao_cotacao():
    cotacao_antiga = Quote.objects.create(
        date='2024-10-17',
        name='soja',
        unity='kg',
        value=120.5
    )
    #atualizando o valor agora para ver se funciona
    cotacao_antiga.value = 150
    cotacao_antiga.name = 'soja orgânica'
    cotacao_antiga.save()

    cotacao_atualizada = Quote.objects.get(id=cotacao_antiga.id)
    assert cotacao_atualizada.value == 150
    assert cotacao_atualizada.name == 'soja orgânica'

@pytest.mark.django_db
def test_campo_ausente():
    dados = {
        'date': '2025-03-04',
        'name': 'arroz',
        'unity': 'kg',
    }

    serializer = QuoteSerializer(data=dados)
    assert not serializer.is_valid()
    assert 'value' in serializer.errors    