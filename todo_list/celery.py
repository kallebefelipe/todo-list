import os

from django.apps import apps

from celery import Celery


os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'todo_list.settings')

app = Celery('todo_list_tasks')
app.config_from_object('django.conf:settings', namespace='CELERY')
app.autodiscover_tasks(lambda: [n.name for n in apps.get_app_configs()])
app.conf.broker_url = 'redis://localhost:6379/0'