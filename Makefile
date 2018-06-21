run-redis:
	redis-server --daemonize yes

jest:
	npm test --runInBand

pytest:
	py.test todos/ --cov=todos
