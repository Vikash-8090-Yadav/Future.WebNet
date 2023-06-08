from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.

def project(request):
	return render(request,'project/index_project.html')
