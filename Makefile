build-image:
	docker build -t wonyus/node-emqx:latest .

start-local:
	docker run --env-file ./.env -p 8080:8080 --name node-emqx wonyus/node-emqx:latest

pull-image:
	docker pull wonyus/node-emqx:latest

start:
	docker run --env-file ./.env -p 8080:8080 --name node-emqx wonyus/node-emqx:latest