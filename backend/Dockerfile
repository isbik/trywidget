FROM python:3.9-slim-buster

# Install system dependencies
RUN apt-get update \
    && apt-get install -y netcat gcc postgresql-client libpq-dev \
    && rm -rf /var/lib/apt/lists/*


WORKDIR /APP

# Copy requirements file
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt


COPY . .

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

RUN python manage.py collectstatic --no-input

COPY entrypoint.sh /entrypoint.sh

RUN chmod +x entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]