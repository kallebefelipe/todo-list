from rest_framework.exceptions import ValidationError
from django.test import TestCase
from model_mommy import mommy
from todos import models
from todos import serializers


class TodoSerializerTests(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.todo = models.Todo.objects.create(
            name='todo_test', user=self.user
        )

    def test_todo_serializer_with_instance(self):
        serializer = serializers.TodoSerializer(self.todo)
        self.assertEqual(
            serializer.data,
            {
                'id': self.todo.id,
                'name': 'todo_test',
                'user': self.user.id
            }
        )

    def test_todo_serializer_with_data(self):
        data = {
            'name': 'todo_serializer_test',
            'user': self.user.id
        }

        serializer = serializers.TodoSerializer(data=data)
        self.assertTrue(serializer.is_valid(raise_exception=True))

    def test_todo_serializer_without_name(self):
        data = {
            'user': self.user.id
        }
        with self.assertRaises(ValidationError):
            serializer = serializers.TodoSerializer(data=data)
            serializer.is_valid(raise_exception=True)

    def test_todo_serializer_without_user(self):
        data = {
            'name': 'todo_serializer_test'
        }
        with self.assertRaises(ValidationError):
            serializer = serializers.TodoSerializer(data=data)
            serializer.is_valid(raise_exception=True)


class TaskSerializerTests(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.todo = models.Todo.objects.create(
            name='todo_test', user=self.user
        )
        self.task = mommy.make(
            'Task', name='task_test', user=self.user, todo=self.todo
        )

    def test_todo_serializer_with_instance(self):
        serializer = serializers.TodoSerializer(self.todo)
        self.assertEqual(
            serializer.data,
            {
                'id': self.todo.id,
                'name': 'todo_test',
                'user': self.user.id
            }
        )

    def test_task_serializer_with_data(self):
        data = {
            'name': 'task_serializer_test',
            'user': self.user.id,
            'todo': self.todo.id
        }

        serializer = serializers.TodoSerializer(data=data)
        self.assertTrue(serializer.is_valid(raise_exception=True))

    def test_task_serializer_without_name(self):
        data = {
            'user': self.user
        }
        with self.assertRaises(ValidationError):
            serializer = serializers.TodoSerializer(data=data)
            serializer.is_valid(raise_exception=True)

    def test_task_serializer_without_user(self):
        data = {
            'name': 'todo_serializer_test'
        }
        with self.assertRaises(ValidationError):
            serializer = serializers.TodoSerializer(data=data)
            serializer.is_valid(raise_exception=True)
