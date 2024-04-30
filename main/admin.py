from django.contrib import admin
from main.models import Contacts, Info

@admin.register(Info)
class InfoAdmin(admin.ModelAdmin):
    list_display = ['content']


@admin.register(Contacts)
class ContactAdmin(admin.ModelAdmin):
    list_display =['address', 'phone', 'email', 'other',]    
