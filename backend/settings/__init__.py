import os

from .core import *
from .cors import *
from .database import *
from .oauth import *
from .celery import *
from .email import *
from .drf import *
from .logging import *


INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.postgres',
    'corsheaders',
    'rest_framework.authtoken',
    'rest_framework',
    'drf_yasg',
]

MY_APPS = [
    'apps.users.apps.UsersConfig',
    'apps.files.apps.FilesConfig',
    'apps.emails.apps.EmailsConfig',
    'apps.plans.apps.PlansConfig',
    'apps.oauth.apps.OauthConfig',
    'apps.widgets.apps.WidgetsConfig',
    'apps.auth.apps.AuthConfig',
    'apps.feedback.apps.FeedbackConfig',
    'apps.payments.apps.PaymentsConfig',
]

INSTALLED_APPS += MY_APPS

MIDDLEWARE = [
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'corsheaders.middleware.CorsMiddleware',

    'shared.cors.public_cors_middleware.PublicCorsMiddleware',
]

ROOT_URLCONF = 'config.urls'


WSGI_APPLICATION = 'config.wsgi.application'


AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'ru-ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True


AUTH_USER_MODEL = 'users.User'

API_URL = os.environ.get('API_URL')


ADMIN_EMAIL = os.environ.get('ADMIN_EMAIL')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD')


MAX_FILE_SIZE = 1024 * 1024 * 50

APPEND_SLASH = False
