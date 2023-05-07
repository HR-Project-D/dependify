from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
import functions.scan as f


# Create your views here.
def say_hello(request):
    return JsonResponse(f.find_dependencies_in_sboms('react', '>=3.0.0'), safe=False)
