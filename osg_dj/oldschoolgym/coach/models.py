from django.db import models
from django.core.exceptions import ValidationError
from user.models import MyUser


TYPES = (
    (0, 'Дистанійно'),
    (1, 'На місці')
)


def experience_validator(value):
    if value < 1:
        raise ValidationError(
            f'Стаж роботи ({value}) має бути не менше 1 року!', params={'experience': value})


def price_validator(value):
    if not value in range(100, 1001):
        raise ValidationError(
            f'Ціна має бути в діапазоні від 100 до 1000 грн!', params={'price': value})


class Coach(models.Model):
    type_training = models.IntegerField(choices=TYPES)
    experience = models.IntegerField(validators=[experience_validator])
    price = models.IntegerField(validators=[price_validator])
    info_block = models.CharField(max_length=60)
    additional_block = models.CharField(max_length=60)
    user_profile = models.OneToOneField(MyUser, on_delete=models.CASCADE)
    is_confirmed = models.BooleanField(default=False)
