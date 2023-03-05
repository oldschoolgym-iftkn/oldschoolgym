from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django_resized import ResizedImageField
from .utils import generate_confirmation_code
from .manager import MyUserManager
from annoying.fields import AutoOneToOneField
ROLES = (
    (0, 'customer'),
    (1, 'coach')
)

GENDERS = (
    ('M', 'male'),
    ('F', 'female')
)


def avatar_path(instance, filename):
    extension = filename.split('.')[-1]
    username = instance.email.split('@')[0]
    new_filename = "gym_%s.%s" % (username, extension)

    return new_filename


class UserVerification(models.Model):
    code = models.CharField(max_length=6, default=generate_confirmation_code)
    is_activate = models.BooleanField(default=False)

    @classmethod
    def get_new(cls):
        return cls.objects.create().id


class MyUser(AbstractBaseUser, PermissionsMixin):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(unique=True)
    bday = models.DateField()
    password = models.TextField()
    created_at = models.DateField(editable=False, auto_now_add=True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    role = models.IntegerField(choices=ROLES)
    avatar = ResizedImageField(upload_to=avatar_path, size=[512, 512], crop=[
                               'middle', 'center'], keep_meta=False, force_format='PNG')
    gender = models.CharField(max_length=1, choices=GENDERS)
    verifying = models.OneToOneField(
        UserVerification, on_delete=models.CASCADE, default=UserVerification.get_new)
    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def __repr__(self):
        return f'{self.first_name} {self.last_name} : {self.email}'
