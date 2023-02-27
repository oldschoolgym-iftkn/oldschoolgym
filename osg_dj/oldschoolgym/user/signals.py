import smtplib
import os
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import MyUser

SMTP_HOST = os.environ.get('HOST')
SMTP_MAIL = os.environ.get('MAIL')
SMTP_TOKEN = os.environ.get('TOKEN')


@receiver(post_save, sender=MyUser)
def welcome_email(sender, instance, *args, **kwargs):
    with smtplib.SMTP_SSL(host=SMTP_HOST, port=465) as server:
        server.login(SMTP_MAIL, SMTP_TOKEN)
        message = f"<h1>Hello, {instance.first_name} {instance.last_name} </h1>"
        server.sendmail(SMTP_MAIL, instance.email, message)
    print('message was send!')
