# todo-list
A simple todo list app built in React and Django.

### Instalando projeto
git clone git@github.com:kallebefelipe/todo-list.git

cd todo-list

pip install -r requirements.txt

npm install

### Instalando redis: 

https://redis.io/topics/quickstart

### Configurando banco no PostgreSql:

É necessário criar um banco com o nome de `todo_list`

### Configurando .env

Criar .env como o example_env no root do projeto

É necessário configurar o REDIS_URL e o DATABASE_URL com a url do banco do PostgreSql

### Rodando migrações

python manage.py migrate

### Rodando Redis

redis-server --daemonize yes

### Rodando celery

celery -A todo_list.celery beat -l info

celery -A todo_list.celery worker -l info

### Rodando servidor

python manage.py runserver
