from django.db import models

class Quote(models.Model):
    date = models.CharField(max_length=255)
    name = models.CharField(max_length=255, unique=True, db_index=True)
    unity = models.CharField(max_length=255)
    value = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.name} em {self.date} - R$ {self.value}"
