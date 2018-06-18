from django.contrib.auth.models import User
from django.urls import reverse
from django.test import TestCase
from rest_framework.test import APIClient
from model_mommy import mommy
from todos import models
from rest_framework import status
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
        self.client = APIClient()

    def test_retrieve_all_todos_with_authenticated_user(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.get('/api/todos/')
        todo = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.todo.name, todo)

    def test_retrieve_all_todos_with_authenticated_superuser(self):
        password = 'test_password'
        User.objects.create_superuser(
            'testsuperuser', 'email@test.com', password
        )
        user = User.objects.get(username='testsuperuser')
        self.client.force_authenticate(user=user)
        response = self.client.get('/api/todos/')
        todo = response.json()[0].get('name')

        self.assertEqual(response.status_code, 200)
        self.assertEqual(self.todo.name, todo)

    def test_retrieve_all_todos_with_not_authenticated_user(self):
        response = self.client.get('/api/todos/')

        self.assertEqual(response.status_code, 401)

    def test_can_not_update_todo_from_another_user(self):
        user = User.objects.get(username=self.sneaky_user.username)
        self.client.force_authenticate(user=user)
        response = self.client.put(
            '/api/todos/1/',
            {'name': 'renamed_test'})
        self.assertEqual(response.status_code, 404)

    def test_can_update_your_todo(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
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
        self.assertEqual(response.status_code, 401)

    def test_can_delete_your_todo(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.delete('/api/todos/1/')
        self.assertEqual(response.status_code, 204)

    def test_can_create_todo(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.post(
            '/api/todos/',
            data=json.dumps({'name': 'create_test'}),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 201)

    def test_retrieve_all_todo_tasks(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.get('/api/todos/1/tasks/')

        self.assertEqual(response.status_code, 200)


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
        self.credentials = {
            'username': self.user.username,
            'password': '123'
        }
        self.sneaky_user = mommy.make('User')
        self.sneaky_user.set_password('123')
        self.sneaky_user.save()
        self.client = APIClient()

    def test_can_update_your_task(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.put(
            '/api/tasks/1/',
            data=json.dumps({
                'name': 'renamed_test',
                'todo': self.todo.id,
                'user': self.user.id,
                'deadline': '2018-10-20 00:00:00',
                'done': False
            }),
            content_type='application/json'
        )
        self.assertEqual(response.status_code, 200)

    def test_delete_your_todo(self):
        user = User.objects.get(username=self.user.username)
        self.client.force_authenticate(user=user)
        response = self.client.delete('/api/tasks/1/')
        self.assertEqual(response.status_code, 204)


class RegistrationViewTests(TestCase):
    def setUp(self):
        self.test_user = User.objects.create_user(
            'testuser', 'test@example.com', 'testpassword'
        )
        self.create_url = reverse('register-user')

    def test_create_user(self):
        data = {
            'username': 'kallebe',
            'email': 'kallebe@test.com',
            'password': 'somepassword'
        }

        response = self.client.post(
            self.create_url, data=json.dumps(data),
            content_type='application/json'
        )

        self.assertEqual(User.objects.count(), 2)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data['user']['email'], data['email'])
        self.assertFalse('password' in response.data)

    def test_create_user_with_no_password(self):
        data = {
            'username': 'test',
            'email': 'kallebe@test.com',
            'password': ''
        }

        response = self.client.post(
            self.create_url, data, format='json'
        )

        self.assertEqual(
            response.status_code, status.HTTP_400_BAD_REQUEST
        )
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['password']), 1)

    def test_create_user_with_preexisting_username(self):
        data = {
            'username': 'testuser',
            'email': 'user@example.com',
            'password': 'testuser'
        }

        response = self.client.post(self.create_url, data, format='json')
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(len(response.data['username']), 1)

    def test_create_user_token(self):
        data = {
            'username': 'foobar',
            'email': 'foobar@example.com',
            'password': 'somepassword'
        }
        response = self.client.post(self.create_url, data, format='json')
        self.assertTrue(response.data['token'])
