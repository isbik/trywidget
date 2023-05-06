SESSION_COOKIE_SAMESITE = None

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:3000',
]

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
]

CORS_ORIGIN_ALLOW_ALL = False
CORS_ALLOW_CREDENTIALS = True


CORS_ALLOW_METHODS = (
    'GET',
    'POST',
    'PUT',
    'PATCH',
    'DELETE',
    'OPTIONS',
)

CORS_ALLOW_HEADERS = (
    'x-requested-with',
    'content-type',
    'accept',
    'origin',
    'authorization',
    'x-csrftoken',
    'cache',
    'cookie',
    'content-range',
)
