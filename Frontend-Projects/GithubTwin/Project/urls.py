# created by me (Vikash kumar yadav):

from django.urls import path , include
from .import views

urlpatterns = [
    path('',views.project,name = 'project'),
]
