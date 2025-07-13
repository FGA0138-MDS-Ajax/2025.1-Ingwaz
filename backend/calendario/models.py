from django.db import models
from django.utils.text import slugify


class Crop(models.Model):
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, editable=False)

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Region(models.Model):
    name = models.CharField(max_length=50)
    crop = models.ForeignKey(Crop, related_name='regions', on_delete=models.CASCADE)

    class Meta:
        unique_together = ('name', 'crop')

    def __str__(self):
        return f'{self.name} ({self.crop.name})'


class State(models.Model):
    name = models.CharField(max_length=2)
    region = models.ForeignKey(Region, related_name='states', on_delete=models.CASCADE)
    plantios = models.JSONField(default=list)
    colheitas = models.JSONField(default=list)
    plantios_colheitas = models.JSONField(default=list)

    class Meta:
        unique_together = ('name', 'region')

    def __str__(self):
        return f'{self.name} ({self.region.name})'
