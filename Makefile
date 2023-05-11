up:
	docker-compose -f ./devops/docker-compose.local.yml up -d --build --remove-orphans

start:
	docker-compose  -f ./devops/docker-compose.local.yml up -d

down:
	docker-compose -f ./devops/docker-compose.local.yml down

stop:
	docker-compose -f ./devops/docker-compose.local.yml stop


up-prod:
	docker-compose -f ./devops/docker-compose.prod.yml up -d --build --remove-orphans

down-prod:
	docker-compose -f ./devops/docker-compose.prod.yml down
