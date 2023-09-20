build-image:
	docker build -t node-emqx .

start-local:
	docker run --env-file ./.env --name node-emqx node-emqx