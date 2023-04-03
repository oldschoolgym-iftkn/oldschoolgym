from django.db.models.signals import pre_save
from django.dispatch import receiver
from .models import MyUser
from .tasks import user_registration


@receiver(pre_save, sender=MyUser)
def set_profile_img(sender, instance, **kwargs):
    if not instance.pk:
        if instance.avatar == 'default.png':
            instance.avatar = 'default_'+instance.gender+'.png'


@receiver(pre_save, sender=MyUser)
def on_user_creating(sender, instance, **kwargs):
    if not instance.pk:
        user_registration.delay(
            instance.email, instance.first_name, instance.last_name, instance.verifying.code)
