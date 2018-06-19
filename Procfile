release: python manage.py migrate
web: gunicorn todo_list.wsgi --log-file -
celery: celery -A todo_list.celery beat -l info
celery: celery -A todo_list.celery worker -l info

