from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from . import models


class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100, allow_blank=False, required=True
    )

    class Meta:
        model = models.Task
        fields = ['id', 'name', 'todo', 'user', 'deadline']


class TodoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=255, allow_blank=False, required=True)
    user = serializers.ReadOnlyField(source='user.id')
    tasks = serializers.SerializerMethodField()

    class Meta:
        model = models.Todo
        fields = ['id', 'name', 'user', 'tasks']

    def is_user_owner(self, obj):
        user = self.context.get('request').user

        try:
            models.Todo.objects.get(pk=obj.id, user=user.id)
        except models.Todo.DoesNotExist:
            return False
        else:
            return True

    def get_tasks(self, obj):
        user = self.context.get('request').user

        kwargs = {
            'todo_id': obj.id
        }

        if not self.is_user_owner(obj):
            kwargs['user__id'] = user.id

        tasks = models.Task.objects.filter(**kwargs)

        serializer = TaskSerializer(tasks, many=True)
        return serializer.data


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        max_length=100, required=True, allow_blank=False,
        write_only=True
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'password']

    def create(self, validated_data):
        user = User(username=validated_data.get('username', None))
        user.set_password(validated_data.get('password', None))
        user.save()
        return user
