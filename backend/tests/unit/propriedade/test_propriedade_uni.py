import pytest
from propriedade.serializers import PropriedadeSerializer

@pytest.mark.django_db
class TestPropriedadeSerializer:

    def test_area_total_negativa(self):
        serializer = PropriedadeSerializer(data={
            "nome": "Área Inválida",
            "area_total": -10,
            "latitude": -10,
            "longitude": -50
        })

        assert not serializer.is_valid()
        assert "area_total" in serializer.errors
        assert "Ensure this value is greater than or equal to 0.01." in str(serializer.errors["area_total"])
