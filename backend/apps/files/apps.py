from django.apps import AppConfig
from django.contrib import admin


class FilesConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'apps.files'
    label = 'files'

    def ready(self):
        models = self.get_models()
        admin_class = type('AdminClass', (admin.ModelAdmin, ), {})

        for model in models:
            if not admin.site.is_registered(model):
                admin.site.register(model, admin_class)
