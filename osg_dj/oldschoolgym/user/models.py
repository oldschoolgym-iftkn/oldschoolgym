from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from django_resized import ResizedImageField
from .manager import MyUserManager

ROLES = (
    (0, 'customer'),
    (1, 'coach')
)


def avatar_path(instance, filename):
    extension = filename.split('.')[-1]
    username = instance.email.split('@')[0]
    new_filename = "gym_%s.%s" % (username, extension)

    return new_filename


class MyUser(AbstractBaseUser):
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
    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def __repr__(self):
        return f'{self.first_name} {self.last_name} : {self.email}'
