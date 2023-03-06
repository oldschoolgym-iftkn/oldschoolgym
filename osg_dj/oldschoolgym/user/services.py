from django.core.mail import send_mail


def send_welcome_mail(email, name, surname, code):
    send_mail(
        subject='Реєстрація в Old School Gym',
        recipient_list=[email],
        message=None,
        from_email=None,
        html_message=f"""<div align='center'>
        <img src='https://i.ibb.co/HCdHPpx/dumbell.png' style="width:128px; height:auto;">
        <h3>Вітаємо, {name} {surname} </h3>
        <h4>Ваш код для підтвердження реєстрації: </h4>
        <div style="
        box-shadow:inset 0px 34px 0px -15px #b54b3a;
        background:linear-gradient(to bottom, #a73f2d 5%, #b34332 100%);
        background-color:#a73f2d;
        border:1px solid #241d13;
        display:inline-block;
        cursor:pointer;
        color:#ffffff;
        font-family:Arial;
        font-size:15px;
        font-weight:bold;
        padding:9px 23px;
        text-decoration:none;
	    text-shadow:0px -1px 0px #7a2a1d;">{code}</div>
        <p><small>Звертаємо вашу увагу, ви не можете користуватись непідтвердженним аккаунтом</small></p>
        <small>З повагою, адміністрація Old School Gym</small>
        </div>"""
    )
