from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.validators import UniqueValidator

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
    email = serializers.EmailField(
        required=False,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    username = serializers.CharField(
        max_length=32,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    password = serializers.CharField(
        max_length=100, required=True, allow_blank=False,
        write_only=True
    )

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data.get('username', None),
            email=validated_data.get('email', None)
        )
        user.set_password(validated_data.get('password', None))
        user.save()
        return user


class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['username'],
            validated_data['email'],
            validated_data['password'],
            )
        return user


class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError(
            "Unable to log in with provided credentials.")
