from celery import task
import datetime
from django.core.mail import EmailMessage
from django.db.models import Prefetch
from todos import models


def send_email(user, tasks):
    body = "Hello From Web App Todo App. Do you have the follows"
    " task with deadline for today:"

    for count, user_task in enumerate(tasks):
        body += 'Task: ' + user_task.name + 'Deadline: ' + str(
            user_task.deadline)

    email = EmailMessage(
        'Web App Todo List Report', body, to=[user.email])
    email.send()


@task()
def report_task():
    start = datetime.datetime.today() - datetime.timedelta(1)
    end = start + datetime.timedelta(days=1)
    users = models.User.objects.all()

    users = models.User.objects.prefetch_related(
      Prefetch(
        'tasks',
        queryset=models.Task.objects.filter(deadline__range=(start, end))
      )
    )
    for user in users:
        send_email(user, user.tasks.all())
