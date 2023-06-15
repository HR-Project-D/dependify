"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from playground.views import Scan
from playground.views import Setup
from playground.views import SetupUserRegistration
from playground.views import UserRegistration
from playground.views import Login
from playground.views import Logout
from playground.views import User
from playground.views import IsSetup
from playground.views import Generate_datasource
from playground.views import Confirm_datasource
from playground.views import Get_datasource
from playground.views import Del_datasource

urlpatterns = [
    #path('admin/', admin.site.urls),
    path ('api/scan/', Scan.as_view()),
    path ('api/setup/', Setup.as_view()),
    path ('api/setup_registration/', SetupUserRegistration.as_view()),
    path ('api/registration/',UserRegistration.as_view()),
    path ('api/login/',Login.as_view()),
    path ('api/logout/',Logout.as_view()),
    path ('api/user/',User.as_view()),
    path ('api/is_setup/',IsSetup.as_view()),
    path ('api/generate_datasource/',Generate_datasource.as_view()),
    path ('api/confirm_datasource/',Confirm_datasource.as_view()),
    path ('api/get_datasource/',Get_datasource.as_view()),
    path ('api/del_datasource/',Del_datasource.as_view()),

]
