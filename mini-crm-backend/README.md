# Mini CRM Backend (Laravel)

> Backend API for the Mini CRM application, built with Laravel and containerized using Docker.

## Setup & Installation

1. **Prerequisites**: Make sure Docker and Docker Compose are installed on your machine.

2. **Clone the Repository**:
    ```bash
    # Replace with your repository URL
    git clone https://github.com/yogaap24/salespond-test.git
    cd salespond-test/mini-crm-backend
    ```

3. **Create `.env` File**:
    ```bash
    cp .env.example .env
    ```

4. **Run with Docker**:
    ```bash
    # Build and start all services
    docker-compose up -d --build

    # Run storage cache
    docker compose exec app chown -R www-data:www-data storage bootstrap/cache

    # Run database migrations and seeders
    docker-compose exec app php artisan migrate --seed
    ```

5. **Access the Application**:
    - The API is accessible at: `http://domain:8080`
    - Example endpoint: `http://domain:8080/api/v1/contacts`
