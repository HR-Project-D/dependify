from rest_framework.views import APIView
from rest_framework.response import Response
import functions.scan as f


# Create your views here.


class Scan(APIView):
    def get(self, request):
        json = {'data': []}
        json['data'].append(f.find_dependencies_in_sboms('react', '>=3.0.0', "Local"))
        return Response(json)
