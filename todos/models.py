from django.contrib.auth.models import User
from django.db import models


class Todo(models.Model):
    name = models.CharField(max_length=255)
    user = models.ForeignKey(
        User, related_name='todos', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Task(models.Model):
    name = models.CharField(max_length=100)
    deadline = models.DateTimeField()
    user = models.ForeignKey(
        User, related_name='tasks', on_delete=models.CASCADE)
    todo = models.ForeignKey(
        'Todo', related_name='tasks', on_delete=models.CASCADE)

    def __str__(self):
        return self.name
