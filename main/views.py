from django.shortcuts import render
from goods.models import Categories
from main.models import Contacts, Info

def index(request):
    context = {
        'title': 'Home - Main',
        'content': '"Home" - organic products for you',
    }
    return render(request, 'main/index.html', context)

def about(request):
    text_on_page = Info.objects.all()
    context = {
        'title': 'Home - About',
        'content': 'About us',
        'text_on_page': text_on_page
    }
    return render(request, 'main/about.html', context)

def contact(request):
    text_on_page = Contacts.objects.all()
    context = {
        'title': 'Contact',
        'content': 'Contact us',
        'text_on_page': text_on_page
    }
    return render(request, 'main/contact.html', context)
