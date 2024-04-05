up: down
	@echo "docker compose up"
	@docker compose up --build -d

down:
	@echo "docker compose down"
	@docker compose down
