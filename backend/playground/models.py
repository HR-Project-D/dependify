from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.contrib.auth import get_user_model
from django.db import models


# Create your models here.

class UserManager(BaseUserManager):
    def create_user(self, name, email, role, password=None):
        if not email:
            raise ValueError("User must have an email address")

        email = self.normalize_email(email)
        user = self.model(name=name, email=email, role=role)
        user.set_password(password)
        user.save(using=self._db)

        return user


class CustomUser(AbstractBaseUser, PermissionsMixin):
    objects = UserManager()
    name = models.CharField(max_length=30)
    email = models.EmailField(max_length=254, unique=True)
    role = models.CharField(max_length=30)
    isActive = models.BooleanField(default=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'role']

    def __str__(self):
        return self.name


class RegistrationKey(models.Model):
    key = models.CharField(max_length=30, unique=True)

    def __str__(self):
        return self.key

