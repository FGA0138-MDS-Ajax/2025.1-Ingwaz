from rest_framework import serializers
from .models import Plantio 

class PlantioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantio 
        fields = '__all__'
    
    def validate(self, data):
        if data['estimativa_colheita'] < data['data']:
            raise serializers.ValidationError("Error")
        return data