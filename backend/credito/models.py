from django.db import models

class Credito(models.Model):
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=20, default='pending')

    def approve(self):
        self.status = 'approved'
        self.save()

    def deny(self):
        self.status = 'denied'
        self.save()