from django.shortcuts import render

def home(request):
    return render(request, 'transferportal/home.html')

def getstarted(request):
    return render(request, 'transferportal/getstarted.html')