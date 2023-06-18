import os
import subprocess
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout, authenticate
from django.core import serializers
from playground.models import UserManager
from playground.models import RegistrationKey
from playground.models import newDataSource as DataSource
import functions.scan as func
import ast
import json
import shutil
from datetime import datetime


# Create your views here.
def toUrl(text):
    return text.replace(" ", "_")

class Scan(APIView):
    def get(self, request):
        datasources = DataSource.objects.all()
        for datasource in datasources:
            repo_path = f'./data/sboms/{datasource.name}'
            absolute_key_path = os.path.abspath(f'./data/keys/{toUrl(datasource.name)}_private_key')
            absolute_key_path = absolute_key_path.replace('\\', '/')
            subprocess.run(['git', 'config', '--global', 'core.sshCommand',
                            f'ssh -i {absolute_key_path} -F /dev/null'])
            subprocess.run(['git', 'pull'], cwd=repo_path)

        name = request.GET.get('name', '')
        version = request.GET.get('version', "['']")
        exactMatch = request.GET.get('exactMatch', '')
        version_list = ast.literal_eval(version)

        bool_exactMatch = eval(exactMatch.capitalize())

        json = {'data': func.find_dependencies_in_sboms(name, version_list, bool_exactMatch)}

        return Response(json)


class Setup(APIView):
    def post(self, request):

        # get the key from data/setup_key file
        with open('data/setup_key', 'r') as f:
            key = f.read()
        print(key)

        request_data = request.data

        request_key = request_data['key']

        # create registration key random key

        new_key = func.create_random_key()
        RegistrationKey.objects.create(key=new_key)

        if request_key == key:
            response_data = {'status': 'success', 'registration_key': new_key}
        else:
            response_data = {'status': 'fail', 'message': 'Invalid key'}

        return Response(response_data)


class IsSetup(APIView):
    def get(self, request):
        # get the key from data/setup_key file
        key = RegistrationKey.objects.all().first()

        # if key is not None then setup is complete and return true
        if key is not None:
            return Response({'is_setup': True})
        else:
            return Response({'is_setup': False})


class SetupUserRegistration(APIView):
    def post(self, request):
        User = get_user_model()

        request_data = request.data

        name = request_data['name']
        email = request_data['email']
        password = request_data['password']
        role = request_data['role']
        key = request_data['key']

        # check if key is valid
        if not RegistrationKey.objects.filter(key=key).exists():
            return Response({'error': 'Invalid key'},
                            status=status.HTTP_400_BAD_REQUEST)

        if not (name and email and password and role):
            return Response({'error': 'username, email, and password are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'A user with this username already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(name, email, role, password)

        login(request, user)

        return Response({'message': 'User registered and logged in successfully.'},
                        status=status.HTTP_201_CREATED)


class UserRegistration(APIView):
    def post(self, request):
        User = get_user_model()

        request_data = request.data

        name = request_data['name']
        email = request_data['email']
        password = request_data['password']
        role = request_data['role']

        if not (name and email and password and role):
            return Response({'error': 'username, email, and password are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(email=email).exists():
            return Response({'error': 'A user with this username already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(name, email, role, password)

        login(request, user)

        return Response({'message': 'User registered and logged in successfully.'},
                        status=status.HTTP_201_CREATED)


class Login(APIView):
    def post(self, request):
        User = get_user_model()

        request_data = request.data

        email = request_data['email']
        password = request_data['password']

        if not (email and password):
            return Response({'error': 'Email and password are required.'},
                            status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(email=email, password=password)

        if not user:
            return Response({'error': 'Invalid Credentials'},
                            status=status.HTTP_404_NOT_FOUND)

        login(request, user)

        return Response(
            {'message': 'User logged in successfully.', 'name': user.name, 'email': user.email, 'role': user.role},
            status=status.HTTP_200_OK)


class Logout(APIView):
    def post(self, request):
        logout(request)
        return Response({'message': 'User logged out successfully.'},
                        status=status.HTTP_200_OK)


class User(APIView):
    def get(self, request):
        User = get_user_model()

        user = request.user

        if not user:
            return Response({'error': 'User not logged in.'},
                            status=status.HTTP_404_NOT_FOUND)

        return Response({'name': user.name, 'email': user.email, 'role': user.role},
                        status=status.HTTP_200_OK)


class Generate_datasource(APIView):
    def post(self, request):
        request_data = request.data
        name = request_data['name']
        description = request_data['description']
        url = request_data['url']

        if DataSource.objects.filter(name=name).exists():
            return Response({'error': 'A datasource with this name already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        if DataSource.objects.filter(url=url).exists():
            return Response({'error': 'A datasource with this url already exists.'},
                            status=status.HTTP_400_BAD_REQUEST)

        keys_dir = "data/keys"

        os.makedirs(keys_dir, exist_ok=True)

        if os.path.exists(f'{keys_dir}/{toUrl(name)}_private_key'):
            return Response({'error': 'Keys already exist.'},
                            status=status.HTTP_400_BAD_REQUEST)

        subprocess.run(
            ['ssh-keygen', '-t', 'rsa', '-b', '4096', '-f', f'{keys_dir}/{toUrl(name)}_private_key', '-q', '-N', ''])

        with open(f'{keys_dir}/{toUrl(name)}_private_key.pub', 'r') as f:
            public_key = f.read()

        datasource = DataSource.objects.create(name=name, description=description,
                                               url=url, key=public_key)
        datasource.save()

        return Response({'message': 'Datasource created successfully.', 'public_key': public_key})

class Confirm_datasource(APIView):
    def post(self, request):
        request_data = request.data
        name = request_data['name']
        datasource = DataSource.objects.get(name=name)
        absolute_key_path = os.path.abspath(f'./data/keys/{toUrl(name)}_private_key')
        absolute_key_path = absolute_key_path.replace('\\', '/')
        print(absolute_key_path)
        if datasource is not None:
            repo_url = datasource.url
            repo_path = f'./data/sboms/{name}'
            if not os.path.exists(repo_path):
                subprocess.run(['git', 'config', '--global', 'core.sshCommand',
                                f'ssh -i {absolute_key_path} -F /dev/null'])
                subprocess.run(['git', 'clone', repo_url, repo_path]) 

                datasource.lastSync = datetime.now()
                datasource.save()
                return Response({'message': 'Datasource confirmed successfully.'})
            else:
                return Response({'error': 'Datasource already exist.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Datasource does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

class Get_datasource(APIView):
    def get(self, request):
        datasources = DataSource.objects.all()
        serialized_data = serializers.serialize('json', datasources)

        json_data = json.loads(serialized_data)
        data_list = []

        for item in json_data:
            fields = item['fields']
            # if the field is called status, rename it to error
            if 'status' in fields:
                fields['error'] = fields['status']
                del fields['status']
            data_list.append(fields)

        response_data = {'data': data_list}
        return Response(response_data, status=status.HTTP_200_OK)

class Del_datasource(APIView):
    def post(self, request):
        request_data = request.data
        name = request_data['name']
        datasource = DataSource.objects.filter(name=name)

        if len(datasource) != 0:
            if os.path.exists(f'./data/keys/{toUrl(name)}_private_key'):
                os.remove(f'./data/keys/{toUrl(name)}_private_key')
            if os.path.exists(f'./data/keys/{toUrl(name)}_private_key.pub'):
                os.remove(f'./data/keys/{toUrl(name)}_private_key.pub')

            if os.path.exists(f'./data/sboms/{name}'):
                shutil.rmtree(f'./data/sboms/{name}')
            datasource.delete()
            return Response({'message': 'Datasource deleted succesfully'})
        else:
            return Response({'error': 'Datasource does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        
        