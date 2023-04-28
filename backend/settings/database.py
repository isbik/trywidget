import dotenv
import os

dotenv.load_dotenv()

print(os.environ.get('POSTGRES_DB'))
print(os.environ.get('POSTGRES_USER'))
print(os.environ.get('POSTGRES_PASSWORD'))

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.environ.get('POSTGRES_DB'),
        'USER': os.environ.get('POSTGRES_USER'),
        'PASSWORD': os.environ.get('POSTGRES_PASSWORD'),
        'HOST': 'postgres',
        'PORT': 5432,
        'OPTIONS': {
            'client_encoding': 'UTF8',
        },
    }
}
