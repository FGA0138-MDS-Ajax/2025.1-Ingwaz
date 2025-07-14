import pytest
from calendario.models import Crop, Region, State
from calendario.serializers import CropSerializer, RegionSerializer, StateSerializer

@pytest.mark.django_db
def test_crop_str_and_slug():
#verificar o método string do modelo Crop e do campo slug
    crop = Crop.objects.create(name="Soja")
    assert str(crop) == "Soja"
    assert crop.slug == "soja"

@pytest.mark.django_db
def test_region_str_and_unique():
#verificar o método string do modelo Region
    crop = Crop.objects.create(name="Milho")
    region = Region.objects.create(name="Sul", crop=crop)
    assert str(region) == "Sul (Milho)"
    # Testa unicidade
    with pytest.raises(Exception):
        Region.objects.create(name="Sul", crop=crop)

@pytest.mark.django_db
def test_state_str_and_unique():
#verificar o método string do modelo State
    crop = Crop.objects.create(name="Arroz")
    region = Region.objects.create(name="Norte", crop=crop)
    state = State.objects.create(name="PA", region=region)
    assert str(state) == "PA (Norte)"
    # Testa unicidade
    with pytest.raises(Exception):
        State.objects.create(name="PA", region=region)

@pytest.mark.django_db
def test_crop_serializer_output():
#verificar se o serializer de crop mostra os dados aninhados certinhos
    crop = Crop.objects.create(name="Feijão")
    region = Region.objects.create(name="Centro-Oeste", crop=crop)
    state = State.objects.create(name="GO", region=region, plantios=[1,2], colheitas=[3], plantios_colheitas=[4])
    serializer = CropSerializer(crop)
    data = serializer.data
    assert data['name'] == "Feijão"
    assert data['regions'][0]['name'] == "Centro-Oeste"
    assert data['regions'][0]['states'][0]['name'] == "GO"
    assert data['regions'][0]['states'][0]['plantios'] == [1,2]
    assert data['regions'][0]['states'][0]['colheitas'] == [3]
    assert data['regions'][0]['states'][0]['plantios_colheitas'] == [4]