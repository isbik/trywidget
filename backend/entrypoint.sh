#!/bin/sh

# Apply database migrations
python manage.py migrate

# Create superuser
#python manage.py initadmin

# Start server with hot-reload
python manage.py runserver 0.0.0.0:8000 --insecure

# Запуск приложения Django. 
# Use this in for prod and nginx to serve static files
# gunicorn config.wsgi:application --preload --bind 0.0.0.0:8000