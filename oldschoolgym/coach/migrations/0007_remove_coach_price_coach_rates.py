# Generated by Django 4.1.7 on 2023-04-03 13:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coach', '0006_client_delete_userclient'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='coach',
            name='price',
        ),
        migrations.AddField(
            model_name='coach',
            name='rates',
            field=models.JSONField(default={}),
        ),
    ]
