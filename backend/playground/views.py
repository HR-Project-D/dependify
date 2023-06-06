import paramiko
import os
from git import Repo
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model
from django.contrib.auth import login, logout, authenticate
from playground.models import UserManager
from playground.models import RegistrationKey
from playground.models import DataSource
import functions.scan as func
import ast


# Create your views here.


class Scan(APIView):
    def get(self, request):
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


        key = paramiko.RSAKey.generate(bits=2048)
        public_key = key.get_base64()

        keys_dir = "data/keys"

        os.makedirs(keys_dir, exist_ok=True)

        filename = f"{name}_private_key.pem"

        private_key_file_path = os.path.join(keys_dir, filename)

        key.write_private_key_file(private_key_file_path)

        datasource = DataSource.objects.create(name=name, description=description,
                                               url=url, key=public_key)
        datasource.save()

        return Response({'message': 'Datasource created successfully.','public_key':public_key})

