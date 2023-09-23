build-image:
	docker build -t node-emqx .

start-local:
	docker run --env-file ./.env -p 8080:8080 --name node-emqx node-emqx