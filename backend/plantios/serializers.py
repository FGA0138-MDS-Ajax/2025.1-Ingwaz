from rest_framework import serializers
from .models import Plantio 


class PlantioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plantio 
        fields = '__all__'

    def validate_propriedade(self, value):
        user = self.context['request'].user 
            
        if value.agricultor != user: 
            raise serializers.ValidationError("Você só pode criar plantios em suas próprias propriedades") 

        return value

    def validate(self, data):
        if data['estimativa_colheita'] < data['data']:
            raise serializers.ValidationError("Error")
        return data