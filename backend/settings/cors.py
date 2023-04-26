ALLOWED_HOSTS = ['*']

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    'http://localhost:3030',
]

CORS_ALLOWED_ORIGIN_REGEXES = [
    'http://localhost:3000',
]

CORS_ALLOW_HEADERS = [
    "content-range",
]
