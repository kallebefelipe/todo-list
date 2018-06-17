from django.core.mail import EmailMessage
from celery import task


@task()
def forgot_password_email(email):
    print('to aqui pirraia')
    email = EmailMessage(
        'Todo-list App Reset Password',
        'body', to=[email])
    email.send()
