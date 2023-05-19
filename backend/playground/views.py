from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import JsonResponse
import functions.scan as f


# Create your views here.


class scan(APIView):
    def get(self, request):
        json = {'data': []}
        json['data'].append(f.find_dependencies_in_sboms('react', '>=3.0.0', "local"))
        return Response(json)

    def post(self, request):
        json = f.find_dependencies_in_sboms('react', '>=3.0.0', "local")
        return Response(json)

