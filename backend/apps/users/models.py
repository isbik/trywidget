from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser, PermissionsMixin
from django.utils.timezone import now
from datetime import timedelta


class UserManager(BaseUserManager):

    def create_user(self, email: str, password=None):
        if not email:
            raise ValueError('email not found')

        user = self.model(email=self.normalize_email(email.lower()))

        user.set_password(raw_password=password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None):

        user = self.create_user(email, password=password)
        user.is_admin = True
        user.save(using=self._db)
        return user


def get_default_trial_end():
    return now() + timedelta(days=7)


class User(AbstractBaseUser):

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    email = models.EmailField(
        verbose_name='email',
        unique=True,
        db_index=True,
        max_length=254
    )

    next_payment_date = models.DateTimeField(null=True)
    trial_end = models.DateTimeField(default=get_default_trial_end)

    created_at = models.DateTimeField(auto_now_add=True)

    # tokens
    email_verify_token = models.CharField(max_length=255, null=True)
    password_token = models.CharField(max_length=255, null=True)

    # analytics
    visit_count = models.IntegerField(default=0)
    last_login_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'

    objects = UserManager()

    class Meta:
        db_table = 'user'

    @property
    def is_staff(self):
        return self.is_admin

    @property
    def is_superuser(self):
        return self.is_admin

    def has_module_perms(self, app_label):
        return self.is_active and self.is_superuser

    def has_perm(self, perm):
        return self.is_active and self.is_superuser
