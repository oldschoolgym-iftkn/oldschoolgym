from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django_resized import ResizedImageField
from .utils import generate_confirmation_code

ROLES = (
    (0, 'customer'),
    (1, 'coach')
)

GENDERS = (
    ('M', 'male'),
    ('F', 'female')
)


class MyUserManager(BaseUserManager):
    def create_verifying(self):
        user_verification = UserVerification()
        user_verification.save(self._db)
        return user_verification

    def create_user(self, email, password, **extra_fields):
        if not email or not password:
            raise ValueError('User must have email and password!')
        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.verifying = self.create_verifying()
        user.set_password(password)
        user.save(self._db)
        return user

    def create_superuser(self, email, password, **extra_fields):
        superuser = self.create_user(email=email, password=password,
                                     is_staff=True, is_superuser=True, **extra_fields)
        return superuser


class UserVerification(models.Model):
    code = models.CharField(max_length=6, default=generate_confirmation_code)
    is_activate = models.BooleanField(default=False)


def avatar_path(instance, filename):
    extension = filename.split('.')[-1]
    username = instance.email.split('@')[0]
    new_filename = "gym_%s.%s" % (username, extension)

    return new_filename


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
                               'middle', 'center'], keep_meta=False, force_format='PNG')  # TODO: default value
    gender = models.CharField(max_length=1, choices=GENDERS)
    verifying = models.OneToOneField(
        UserVerification, on_delete=models.CASCADE)
    objects = MyUserManager()
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email

    def __repr__(self):
        return f'{self.first_name} {self.last_name} : {self.email}'
