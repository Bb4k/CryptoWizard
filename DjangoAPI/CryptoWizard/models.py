from django.db import models

import re
from django.core.exceptions import ValidationError


def validator_passwd(string):
    """
    password validator;

    :param string: string
    :return:    true if given string matches:
                min length is 6 and max length is 20,
                at least include a digit number,
                at least an uppercase and a lowercase letter,
                at least a special character
    """
    if re.match(r'^(?=\S{6,20}$)(?=.*?\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[^A-Za-z\s\d])', string) is None:
        raise ValidationError("[error]: password not valid")


# - User model -
class WizardUser(models.Model):
    user_id = models.CharField(max_length=6, primary_key=True)
    user_email = models.EmailField(max_length=254, unique=True)
    user_f_name = models.CharField(max_length=32)
    user_l_name = models.CharField(max_length=32)
    user_dob = models.DateField()
    user_last_access = models.DateTimeField(auto_now_add=True)
    user_active = models.BooleanField(default=False)
    user_created = models.DateTimeField(auto_now_add=True)
    user_updated = models.DateTimeField(auto_now=True)


# - Password model -
class Password(models.Model):
    pw_id = models.CharField(max_length=6, primary_key=True)
    pw_user_id = models.ForeignKey(WizardUser, on_delete=models.CASCADE)
    pw_encr_str = models.CharField(max_length=254)


class Token(models.Model):
    token_uuid = models.CharField(max_length=15, primary_key=True)
    token_name = models.CharField(max_length=32, unique=True)
    token_sym = models.CharField(max_length=5, unique=True)
    token_img = models.URLField(max_length=128)


class Price(models.Model):
    price_id = models.IntegerField(primary_key=True)
    price_token_uuid = models.ForeignKey(Token, on_delete=models.DO_NOTHING, unique=False)
    price_timestamp = models.CharField(max_length=128)
    price_value = models.FloatField()
