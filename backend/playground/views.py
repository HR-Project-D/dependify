from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
import functions.scan as f


# Create your views here.


class scan(APIView):
    def get(self, request):
        json = f.find_dependencies_in_sboms('react', '>=3.0.0')
        return Response(json)
