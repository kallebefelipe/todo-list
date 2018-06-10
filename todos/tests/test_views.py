from django.contrib.auth.models import User
from django.test import TestCase
from django.test.client import Client
from model_mommy import mommy
from todos import models
import json


class TodoViewSetTests(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.user.set_password('123')
        self.user.save()
        self.todo = mommy.make(
            models.Todo, name='todo_test', user=self.user
        )
        self.task = mommy.make(
            models.Task, name='task_test', user=self.user, todo=self.todo
        )
        self.sneaky_user = mommy.make('User')
        self.sneaky_user.set_password('123')
        self.sneaky_user.save()

    def test_retrieve_all_todos_with_authenticated_user(self):
        self.client.login(
            username=self.user.username, password='123')
        response = self.client.get('/api/todos/')
        todo = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.todo.name, todo)

    def test_retrieve_all_todos_with_authenticated_superuser(self):
        password = 'test_password'
        superuser = User.objects.create_superuser(
            'testsuperuser', 'email@test.com', password
        )

        client = Client()
        client.login(username=superuser.username, password=password)

        response = client.get('/api/todos/')
        todo = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.todo.name, todo)

    def test_retrieve_all_todos_with_not_authenticated_user(self):
        response = self.client.get('/api/todos/')

        self.assertEqual(response.status_code, 302)

    def test_can_not_update_todo_from_another_user(self):
        self.client.login(
            username=self.sneaky_user.username, password='123')
        response = self.client.put(
            '/api/todos/1/',
            {'name': 'renamed_test'})
        self.assertEqual(response.status_code, 404)

    def test_can_update_your_todo(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.put(
            '/api/todos/1/',
            data=json.dumps({'name': 'renamed_test'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_can_not_delete_todo_from_another_user(self):
        self.client.login(
            username=self.sneaky_user.username, password='123')
        response = self.client.delete('/api/todos/1/')
        self.assertEqual(response.status_code, 404)

    def test_can_delete_your_todo(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.delete('/api/todos/1/')
        self.assertEqual(response.status_code, 204)

    def test_can_create_todo(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.post(
            '/api/todos/',
            data=json.dumps({'name': 'create_test'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_all_todo_tasks(self):
        self.client.login(
            username=self.user.username, password='123')
        response = self.client.get('/api/todos/1/tasks/')
        task = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.task.name, task)


class TaskViewSetTests(TestCase):
    def setUp(self):
        self.user = mommy.make('User')
        self.user.set_password('123')
        self.user.save()
        self.todo = mommy.make(
            models.Todo, name='todo_test', user=self.user
        )
        self.task = mommy.make(
            models.Task, name='task_test', user=self.user, todo=self.todo
        )
        self.sneaky_user = mommy.make('User')
        self.sneaky_user.set_password('123')
        self.sneaky_user.save()

    def test_retrieve_all_tasks_with_authenticated_user(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.get('/api/tasks/')
        tasks = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.task.name, tasks)

    def test_retrieve_all_tasks_with_not_authenticated_user(self):
        response = self.client.get('/api/tasks/')

        self.assertEqual(response.status_code, 302)

    def test_can_update_your_task(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.put(
            '/api/tasks/1/',
            data=json.dumps({
                'name': 'renamed_test',
                'todo': self.todo.id,
                'user': self.user.id
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_your_todo(self):
        self.client.login(username=self.user.username, password='123')
        response = self.client.delete('/api/tasks/1/')
        self.assertEqual(response.status_code, 204)

    # def test_can_create_task(self):
    #     self.client.login(username=self.user.username, password='123')
    #     response = self.client.post(
    #         '/api/tasks/',
    #         data=json.dumps({
    #             'name': 'create_test',
    #             'todo': self.todo.id,
    #             'user': self.user.id,
    #             'deadline': timezone.now()
    #         }),
    #         content_type='application/json'
    #     )
    #     self.assertEqual(response.status_code, 201)
