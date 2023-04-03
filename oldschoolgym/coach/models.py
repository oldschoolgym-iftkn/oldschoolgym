from django.db import models
from django.core.exceptions import ValidationError
from user.models import MyUser


TYPES = (
    (0, 'Remote'),
    (1, 'Offline'),
    (3, 'Both'),
)

CATEGORIES = (
    (0, 'Bodybuilding'),
    (1, 'Powerlifting'),
    (2, 'Armwrestling'),
    (3, 'Strongman'),
    (4, 'Armlifting'),
    (5, 'Gymnastic'),
    (6, 'Bikini Fitness'),
)


def experience_validator(value):
    if value < 1:
        raise ValidationError(
            f'Стаж роботи ({value}) має бути не менше 1 року!', params={'experience': value})


def price_validator(value):
    if value not in range(100, 1001):
        raise ValidationError(
            'Ціна має бути в діапазоні від 100 до 1000 грн!', params={'price': value})


class Coach(models.Model):
    class Meta:
        verbose_name = 'Coach'
        verbose_name_plural = 'Coaches'
    type_training = models.SmallIntegerField(choices=TYPES)
    experience = models.SmallIntegerField(
        validators=[experience_validator])
    price = models.SmallIntegerField(
        validators=[price_validator])
    info_block = models.CharField(max_length=60)
    additional_block = models.CharField(max_length=60)
    user_profile = models.OneToOneField(
        MyUser, on_delete=models.CASCADE, related_name='coach_account')
    category = models.SmallIntegerField(choices=CATEGORIES)
    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.user_profile.first_name} {self.user_profile.last_name}'


class UserApplication(models.Model):
    user = models.OneToOneField(
        MyUser, on_delete=models.CASCADE, related_name='my_application')
    coach = models.ForeignKey(
        Coach, on_delete=models.CASCADE, related_name='user_applications')
    message = models.CharField(max_length=50)
    is_accepted = models.BooleanField(default=False)


class Client(models.Model):
    user = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    tax = models.IntegerField()
    count_of_train = models.IntegerField()
