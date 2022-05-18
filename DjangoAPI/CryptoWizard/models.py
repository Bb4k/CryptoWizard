from django.db import models


# - Plan model -
class Plan(models.Model):
    plan_id = models.AutoField(primary_key=True)
    plan_name = models.CharField(max_length=8)
    plan_price = models.CharField(max_length=20)
    plan_img = models.URLField()
    plan_benefits = models.CharField(max_length=1024)


# - User model -
class WizardUser(models.Model):
    user_id = models.AutoField(primary_key=True)
    user_email = models.EmailField(max_length=254, unique=True)
    user_f_name = models.CharField(max_length=32)
    user_l_name = models.CharField(max_length=32)
    user_dob = models.DateField(null=True, blank=True)
    user_last_access = models.DateTimeField(auto_now_add=True, blank=True)
    user_active = models.BooleanField(default=False, blank=True)
    user_created = models.DateTimeField(auto_now_add=True, blank=True)
    user_updated = models.DateTimeField(auto_now=True, blank=True)
    user_plan = models.ForeignKey(Plan, on_delete=models.DO_NOTHING, default=0, blank=True)


# - Token model -
class Token(models.Model):
    token_id = models.AutoField(primary_key=True)
    token_name = models.CharField(max_length=32, unique=True, blank=True)
    token_sym = models.CharField(max_length=5, unique=True, blank=True)
    token_img = models.URLField(max_length=128, blank=True)
    token_next_price = models.FloatField()


# - WizardUserInvestments model -
class WizardUserInvestments(models.Model):
    investment_id = models.AutoField(primary_key=True)
    investment_user_id = models.ForeignKey(WizardUser, on_delete=models.CASCADE)
    investment_sym = models.CharField(max_length=5)
    investment_init_value = models.FloatField()
    investment_cur_value = models.FloatField()
    investment_tokens = models.IntegerField()


# - WizardUserTransactions model -
class WizardUserTransactions(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    transaction_user_id = models.ForeignKey(WizardUser, on_delete=models.DO_NOTHING)
    transaction_value = models.FloatField()
    transaction_deposit = models.BooleanField()
    transaction_success = models.BooleanField()
    transaction_timestamp = models.DateTimeField(auto_now_add=True, blank=True)
    transaction_token_sym = models.CharField(max_length=5)


# - Password model -
class Password(models.Model):
    pw_id = models.AutoField(primary_key=True)
    pw_user_id = models.OneToOneField(WizardUser, on_delete=models.CASCADE)
    pw_encr_str = models.CharField(max_length=254)


# - WizardUserFollow
class WizardUserFollow(models.Model):
    follow_id = models.AutoField(primary_key=True)
    follow_user_id = models.ForeignKey(WizardUser, on_delete=models.DO_NOTHING)
    follow_token = models.ForeignKey(Token, on_delete=models.DO_NOTHING)


# - Price model -
class Price(models.Model):
    price_id = models.AutoField(primary_key=True)
    price_token_id = models.ForeignKey(Token, on_delete=models.DO_NOTHING)
    price_timestamp = models.DateField(max_length=128)
    price_real = models.FloatField()
    price_predicted = models.FloatField()
