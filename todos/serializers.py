from django.contrib.auth.models import User
from rest_framework import serializers
from . import models


class TodoSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=255, allow_blank=False, required=True)
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = models.Todo
        fields = ['id', 'name', 'user']


class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(
        max_length=100, allow_blank=False, required=True
    )
    user = serializers.ReadOnlyField(source='user.id')

    class Meta:
        model = models.Task
        fields = ['id', 'name', 'todo', 'user']


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
