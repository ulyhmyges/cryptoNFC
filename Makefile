up: down
	@echo "MongoDB container cryptobox is running..."
	@docker compose up --build -d

down:
	@echo "docker compose down"
	@docker compose down
