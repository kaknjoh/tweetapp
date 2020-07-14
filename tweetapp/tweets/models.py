from django.db import models

# Create your models here.
class Tweet(models.Model): 
    content=models.CharField()