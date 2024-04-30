from django.db import models

class Info(models.Model):
    content = models.TextField(max_length=1000)

    class Meta:
        db_table = "info"
        verbose_name = "Info"
        verbose_name_plural = "Info"

class Contacts(models.Model):
    address = models.CharField(max_length=200)
    phone = models.CharField(max_length=200)
    email = models.CharField(max_length=100)
    other = models.TextField(max_length=200)

    class Meta:
        db_table = "contact"
        verbose_name = "Contact"
        verbose_name_plural = "Contact"


    
