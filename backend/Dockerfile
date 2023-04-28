FROM python:3.9-slim-buster

# Install system dependencies
RUN apt-get update \
    && apt-get install -y netcat gcc postgresql-client libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Create and set the working directory
WORKDIR /usr/src/app

# Copy requirements.txt
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the rest of the application files
COPY . .

# Run migrations and collectstatic
# RUN python manage.py migrate --no-input
RUN python manage.py collectstatic --no-input


CMD python manage.py runserver  
