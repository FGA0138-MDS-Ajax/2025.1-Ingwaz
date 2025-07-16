from django.db import models
from propriedade.models import Propriedade 

class Plantio(models.Model):
    cultura = models.CharField(max_length=100)  
    area = models.DecimalField(max_digits=100, decimal_places=2)
    data = models.DateField()
    estimativa_colheita = models.DateField() 
    propriedade = models.ForeignKey(Propriedade, on_delete=models.CASCADE, related_name="plantios")
    

    #def calcularProdutividade():
    
    