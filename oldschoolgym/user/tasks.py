from oldschoolgym.celery import app
from .services import send_welcome_mail


@app.task
def user_registration(user_email, name, surname, code):
    send_welcome_mail(user_email, name, surname, code)
