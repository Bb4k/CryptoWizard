from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WizardUser
        fields = '__all__'


# - Password serializer -
class PasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Password
        fields = '__all__'


class TokenSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Token
        fields = '__all__'


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Price
        fields = '__all__'


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Plan
        fields = '__all__'


class WizardUserInvestmentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WizardUserInvestments
        fields = '__all__'


# - WizardUserTransactions model -
class WizardUserTransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WizardUserTransactions
        fields = '__all__'


# - WizardUserTransactions model -
class WizardFollowSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WizardUserFollow
        fields = '__all__'
