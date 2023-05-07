up:
	docker-compose -f ./devops/docker-compose.local.yml up -d --build --remove-orphans

start:
	docker-compose  -f ./devops/docker-compose.local.yml up -d

down:
	docker-compose -f ./devops/docker-compose.local.yml down

stop:
	docker-compose -f ./devops/docker-compose.local.yml stop

# Start client for develop mode
dev-client:
	cd client && npm i && npm run dev