from django.test import TestCase
from django.utils import timezone
from model_mommy import mommy
from todos import models
from todos.tasks import send_email, report_task


class SendEmailTest(TestCase):

    def setUp(self):
        self.user = mommy.make('User')
        self.todo = mommy.make(
            models.Todo, name='todo_test', user=self.user
        )
        self.task = mommy.make(
            models.Task,
            name='task_test',
            deadline=timezone.now(),
            user=self.user,
            todo=self.todo)

    def test_send_email(self):
        mail_sent_success = send_email(self.user, [self.task])
        self.assertIsNotNone(mail_sent_success)

    def test_task_send_email(self):
        self.assertIsNone(report_task())
