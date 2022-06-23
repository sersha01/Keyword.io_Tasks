from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class User(User):
    name = models.CharField(max_length=255, null=True, blank=True)

class Book(models.Model):
    image = models.CharField(max_length=255, null=True, blank=True)
    title = models.CharField(max_length=255, null=True)
    author = models.CharField(max_length=255, null=True)
    description = models.TextField(null=True)
