from pathlib import Path

import os
import sys
import dotenv


BASE_DIR = Path(__file__).resolve().parent.parent


PROJECT_ROOT = os.path.dirname(__file__)

sys.path.insert(0, os.path.join(PROJECT_ROOT, 'apps'))

dotenv_file = os.path.join(BASE_DIR, '.env')

if os.path.isfile(dotenv_file):
    dotenv.load_dotenv(dotenv_file)


SECRET_KEY = os.environ.get('SECRET_KEY')

DEBUG = os.environ.get('DEBUG', True)


TEMP_URL = 'temp/'
TEMP_ROOT = os.path.join(BASE_DIR, 'temp')


STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'

MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'


TEMPLATES_DIR = os.path.join(BASE_DIR, 'templates')

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [TEMPLATES_DIR],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]


CLIENT_URL = os.environ.get('CLIENT_URL', 'http://localhost:3000')
