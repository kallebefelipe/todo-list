from rest_framework import serializers
from . import models


class TodoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=255, allow_blank=False, required=True)

    class Meta:
        model = models.Todo
        fields = ['id', 'name', 'user']

    def __str__(self):
        return self.name


class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100, allow_blank=False, required=True
    )

    class Meta:
        model = models.Task
        fields = ['id', 'name', 'todo', 'user']


class UserSerializer(serializers.ModelSerializer):
    pass
