import os
from dotenv import load_dotenv
from celery import Celery

load_dotenv()
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'oldschoolgym.settings')
app = Celery('oldschoolgym')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks()
