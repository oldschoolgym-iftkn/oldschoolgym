from django.core.mail import send_mail


def send_welcome_mail(email, name, surname):
    send_mail(
        subject='Реєстрація в Old School Gym',
        recipient_list=[email],
        message=None,
        from_email=None,
        html_message=f"""<div align='center'>
        <img src='https://i.ibb.co/HCdHPpx/dumbell.png'>
        <h1>Hello,{name} {surname} </h1>
        </div>"""
    )
