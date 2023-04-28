from django.apps import AppConfig
from django.contrib import admin


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.users'
    label = 'users'

    def ready(self):
        admin_class = type('AdminClass', (admin.ModelAdmin, ), {})
        models = self.get_models()

        for model in models:
            if not admin.site.is_registered(model):
                admin.site.register(model, admin_class)
