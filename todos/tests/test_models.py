from django.db.utils import IntegrityError
from django.utils import timezone
from model_mommy import mommy
from django.test import TestCase
from todos import models


class TodoModelTestsCase(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.todo = models.Todo.objects.create(
            name='todo_test', user=self.user
        )

    def test_todo_creation(self):
        self.assertTrue(models.Todo.objects.get(name='todo_test'))

    def test_todo_creation_without_name(self):
        with self.assertRaises(IntegrityError):
            models.Todo.objects.create(user=self.user)

    def test_todo_creation_without_user(self):
        with self.assertRaises(IntegrityError):
            models.Todo.objects.create(name='todo_test')

    def test_todo_name(self):
        self.assertEqual('todo_test', str(self.todo))


class TaskModelTestsCase(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.todo = models.Todo.objects.create(
            name='todo_test', user=self.user
        )
        self.task = models.Task.objects.create(
            name='task_test',
            deadline=timezone.now(),
            user=self.user,
            todo=self.todo
        )

    def test_task_creation(self):
        self.assertTrue(models.Task.objects.get(name='task_test'))

    def test_task_creation_without_name(self):
        with self.assertRaises(IntegrityError):
            models.Task.objects.create(
                deadline=timezone.now(),
                user=self.user,
                todo=self.todo
            )

    def test_task_creation_without_user(self):
        with self.assertRaises(IntegrityError):
            models.Task.objects.create(
                name='task_test',
                deadline=timezone.now(),
                todo=self.todo
            )

    def test_task_creation_without_todo(self):
        with self.assertRaises(IntegrityError):
            models.Task.objects.create(
                name='task_test',
                deadline=timezone.now(),
                user=self.user,
            )

    def test_todo_name(self):
        self.assertEqual('task_test', str(self.task))
