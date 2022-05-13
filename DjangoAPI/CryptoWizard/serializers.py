import io

from rest_framework import serializers
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser
from . import models


# - User serializer -
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.WizardUser
        fields = '__all__'
    user_id = serializers.CharField(max_length=6)
    user_email = serializers.EmailField(max_length=254)
    user_f_name = serializers.CharField(max_length=32)
    user_l_name = serializers.CharField(max_length=32)
    user_dob = serializers.DateField()
    user_last_access = serializers.DateTimeField()
    user_active = serializers.BooleanField(default=False)
    user_created = serializers.DateTimeField()
    user_updated = serializers.DateTimeField()

    def create(self, validated_data):
        return models.WizardUser(**validated_data)

    def update(self, instance, validated_data):
        instance.user_email = validated_data.get('user_email', instance.user_email)
        instance.user_f_name = validated_data.get('user_f_name', instance.user_f_name)
        instance.user_l_name = validated_data.get('user_l_name', instance.user_l_name)
        instance.user_dob = validated_data.get('user_dob', instance.user_dob)
        instance.user_last_access = validated_data.get('user_last_access', instance.user_last_access)
        instance.user_active = validated_data.get('user_active', instance.user_active)
        instance.user_updated = validated_data.get('user_updated', instance.user_updated)
        instance.save()
        return instance


# - Password serializer -
class PasswordSerializer(serializers.Serializer):
    pw_id = serializers.CharField(max_length=6)
    user_id = serializers.CharField(max_length=6)
    pw_encr_str = serializers.CharField(max_length=254)

    def create(self, validated_data):
        return models.Password(**validated_data)

    def update(self, instance, validated_data):
        instance.pw_encr_str = validated_data.get('pw_encr_str', instance.pw_encr_str)
        instance.save()
        return instance


class TokenSerializer(serializers.Serializer):
    token_uuid = serializers.CharField(max_length=15)
    token_name = serializers.CharField(max_length=32)
    token_sym = serializers.CharField(max_length=5)
    token_img = serializers.URLField(max_length=128)

    def create(self, validated_data):
        return models.Token(**validated_data)

    def update(self, instance, validated_data):
        instance.token_name = validated_data.get('token_name', instance.token_name)
        instance.save()
        return instance


class PriceSerializer(serializers.Serializer):
    price_id = serializers.IntegerField()
    price_token_uuid = serializers.CharField(max_length=15)
    price_timestamp = serializers.CharField(max_length=128)
    price_value = serializers.FloatField()

    def create(self, validated_data):
        return models.Price(**validated_data)

    def update(self, instance, validated_data):
        instance.price_value = validated_data.get('price_value', instance.price_value)
        instance.save()
        return instance

