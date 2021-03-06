from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    name = models.CharField(max_length=255, blank=False, default=None)
    user = models.ForeignKey(
        User, related_name='todos', on_delete=models.CASCADE, blank=False,
        null=False)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=100, blank=False, default=None)
    deadline = models.DateTimeField()
    user = models.ForeignKey(
        User, related_name='tasks', on_delete=models.CASCADE, blank=True,
        null=True)
    todo = models.ForeignKey(
        'Todo', related_name='tasks', on_delete=models.CASCADE, blank=False,
        null=False)
    done = models.BooleanField(default=False)

    def __str__(self):
        return self.name
