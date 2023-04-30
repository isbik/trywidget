REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        # import custom class
        'shared.auth.token_auth_cookie.TokenAuthSupportCookie',
        # import built-in class
        'rest_framework.authentication.SessionAuthentication',
    ],
}
