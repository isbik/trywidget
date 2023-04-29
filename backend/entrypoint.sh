#!/bin/sh

# Миграции базы данных Django.
python manage.py makemigrations
python manage.py migrate


python manage.py runserver 0.0.0.0:8000 --insecure


# Запуск приложения Django. 
# Use this in for prod and nginx to serve static files
# gunicorn config.wsgi:application --preload --bind 0.0.0.0:8000