release: python manage.py migrate
web: gunicorn todo_list.wsgi --log-file -
celery_beat: celery -A todo_list.celery beat -l info
celery_worker: celery -A todo_list.celery worker -l info

