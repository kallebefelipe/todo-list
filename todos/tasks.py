from celery import task
import datetime
from django.core.mail import EmailMessage
from django.db.models import Prefetch
from todos import models


def send_email(user, tasks):
    body = "Hello From Web App Todo App. You have the follows task for today:"

    for count, user_task in enumerate(tasks):
        body += '\n\n'+str(count+1) + ' Task: \n' + user_task.name + (
            '\n Deadline: ' + str(user_task.deadline))

    email = EmailMessage(
        'Web App Todo List Report', body, to=[user.email])
    email.send()

    return email


@task()
def report_task():
    start = datetime.datetime.today() - datetime.timedelta(2)
    end = start + datetime.timedelta(days=1)

    users = models.User.objects.prefetch_related(
      Prefetch(
        'tasks',
        queryset=models.Task.objects.filter(deadline__range=(start, end))
      )
    )
    for user in users:
        send_email(user, user.tasks.all())
