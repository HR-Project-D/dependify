from rest_framework.views import APIView
from rest_framework.response import Response
import functions.scan as f
import ast


# Create your views here.


class Scan(APIView):
    def get(self, request):
        name = request.GET.get('name', '')
        version = request.GET.get('version', "['']")
        exactMatch = request.GET.get('exactMatch', '')
        version_list = ast.literal_eval(version)

        bool_exactMatch = eval(exactMatch.capitalize())

        json = {'data': f.find_dependencies_in_sboms(name, version_list, bool_exactMatch)}

        return Response(json)


class Setup(APIView):
    def post(self, request):

        # get the key from data/setup_key file
        with open('data/setup_key', 'r') as f:
            key = f.read()
        print(key)

        request_data = request.data

        request_key = request_data['key']

        if request_key == key:
            response_data = {'status': 'success'}
        else:
            response_data = {'status': 'fail', 'message': 'Invalid key'}

        return Response(response_data)
