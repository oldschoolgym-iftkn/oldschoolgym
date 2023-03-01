# import smtplib
import os
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MyUser
from .tasks import user_registration


@receiver(post_save, sender=MyUser)
def on_user_creating(sender, instance, **kwargs):
    user_registration.delay(
        instance.email, instance.first_name, instance.last_name)
