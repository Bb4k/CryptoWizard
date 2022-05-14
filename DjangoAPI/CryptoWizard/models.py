from django.db import models

import re
from django.core.exceptions import ValidationError


# - User model -
class WizardUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_email = models.EmailField(max_length=254, unique=True)
    user_f_name = models.CharField(max_length=32)
    user_l_name = models.CharField(max_length=32)
    user_dob = models.DateField(blank=True)
    user_last_access = models.DateTimeField(auto_now_add=True, blank=True)
    user_active = models.BooleanField(default=False, blank=True)
    user_created = models.DateTimeField(auto_now_add=True, blank=True)
    user_updated = models.DateTimeField(auto_now=True, blank=True)


# - Password model -
class Password(models.Model):
    pw_id = models.AutoField(primary_key=True)
    pw_user_id = models.OneToOneField(WizardUser, on_delete=models.CASCADE)
    pw_encr_str = models.CharField(max_length=254)


class Token(models.Model):
    token_id = models.AutoField(primary_key=True)
    token_name = models.CharField(max_length=32, unique=True)
    token_sym = models.CharField(max_length=5, unique=True)
    token_img = models.URLField(max_length=128)


class Price(models.Model):
    price_id = models.AutoField(primary_key=True)
    price_token_id = models.ForeignKey(Token, on_delete=models.DO_NOTHING, unique=True)
    price_timestamp = models.DateField(max_length=128)
    price_value = models.FloatField()
