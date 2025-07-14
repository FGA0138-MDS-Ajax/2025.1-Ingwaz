import pytest
import json
from django.urls import reverse
from rest_framework.test import APIClient
from calendario.models import Crop, Region, State
from django.contrib.auth import get_user_model

@pytest.mark.django_db
def test_crop_detail_view_retorna_cultura_existente():
#verificar o detalhamento de uma cultura existente
    crop = Crop.objects.create(name="Soja")
    url = reverse('crop-detail', kwargs={'slug': crop.slug})
    client = APIClient()
    response = client.get(url)
    assert response.status_code == 200
    assert response.data['name'] == "Soja"

@pytest.mark.django_db
def test_crop_detail_view_nao_encontra_slug():
#verificar o detalhamento de uma cultura que não existe
    url = reverse('crop-detail', kwargs={'slug': 'inexistente'})
    client = APIClient()
    response = client.get(url)
    assert response.status_code == 404

@pytest.mark.django_db
def test_update_view_sem_autenticacao():
#verificar atualização dos dados sem autenticação
    url = reverse('update')
    client = APIClient()
    response = client.post(url)
    assert response.status_code == 401