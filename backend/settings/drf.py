REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'shared.auth.token_auth_cookie.TokenAuthSupportCookie',
        'rest_framework.authentication.SessionAuthentication',
    ],
}
