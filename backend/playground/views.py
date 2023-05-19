from rest_framework.views import APIView
from rest_framework.response import Response
import functions.scan as f


# Create your views here.


class Scan(APIView):
    def get(self, request):

        name = request.GET.get('name', '')
        version = request.GET.get('version', '')
        source = request.GET.get('source', '')

        json = {'data': []}

        json['data'].append(f.find_dependencies_in_sboms(name, version, source))
        return Response(json)
