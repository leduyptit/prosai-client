.PHONY: help dev prod build clean logs shell stop restart

# Default target
help:
	@echo "Available commands:"
	@echo "  dev     - Start development environment (port 3001)"
	@echo "  prod    - Start production environment (port 3002)"
	@echo "  build   - Build production image"
	@echo "  clean   - Clean up containers and images"
	@echo "  logs    - Show logs for development container"
	@echo "  shell   - Open shell in development container"
	@echo "  stop    - Stop all containers"
	@echo "  restart - Restart development environment"

# Development environment
dev:
	docker-compose up --build -d
	@echo "Development environment started at http://localhost:3001"

# Production environment
prod:
	docker-compose -f docker-compose.prod.yml up --build -d
	@echo "Production environment started at http://localhost:3002"

# Build production image
build:
	docker build -t prosai-client:latest .
	@echo "Production image built successfully"

# Clean up
clean:
	docker-compose down --rmi all --volumes --remove-orphans
	docker-compose -f docker-compose.prod.yml down --rmi all --volumes --remove-orphans
	docker system prune -f
	@echo "Cleanup completed"

# Show logs
logs:
	docker-compose logs -f prosai-client-dev

# Open shell in development container
shell:
	docker-compose exec prosai-client-dev sh

# Stop all containers
stop:
	docker-compose down
	docker-compose -f docker-compose.prod.yml down
	@echo "All containers stopped"

# Restart development environment
restart:
	docker-compose restart
	@echo "Development environment restarted"

# Production logs
logs-prod:
	docker-compose -f docker-compose.prod.yml logs -f prosai-client-prod

# Production shell
shell-prod:
	docker-compose -f docker-compose.prod.yml exec prosai-client-prod sh

# Health check
health:
	@echo "Checking container health..."
	@docker-compose ps
	@echo "Checking production container health..."
	@docker-compose -f docker-compose.prod.yml ps
