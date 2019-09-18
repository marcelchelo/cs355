from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name = 'transferportal-home'),
    path('getstarted/', views.getstarted, name = 'transferportal-getstarted')
]