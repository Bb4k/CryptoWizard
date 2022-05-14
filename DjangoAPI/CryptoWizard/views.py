from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpRequest

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
import json
import requests

from . import models
from . import serializers


@api_view(['GET'])
def user_list(request):
    users = models.WizardUser.objects.all()
    serializer = serializers.UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def user(request, email):
    _user = models.WizardUser.objects.get(user_email=email)
    serializer = serializers.UserSerializer(_user, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def token_list(request):
    coins = models.Token.objects.all()
    serializer = serializers.TokenSerializer(coins, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def user_create(request):
    data = JSONParser().parse(request)
    user_pw = data['user_password']
    print(user_pw)
    del data['user_password']
    print(type(data))
    print(data)
    user_data = data
    print(user_data)
    user_serializer = serializers.UserSerializer(data=user_data)
    print(user_serializer)
    if user_serializer.is_valid():
        print('ok')
        user_serializer.save()
        #print(user_data)
        user_data = requests.get(f"http://127.0.0.1:8000/api/user/{user_data['user_email']}")
        print(user_data.json())
        pw_data = {
                    "pw_user_id": user_data.json()['user_id'],
                    "pw_encr_str": user_pw
                }

        print(type(pw_data))
        pw_serializer = serializers.PasswordSerializer(data=pw_data)

        print(pw_serializer)

        if pw_serializer.is_valid():
            pw_serializer.save()
            return Response("Added Successfully!!")
        else:
            print('password not valid')
            return Response("Failed to Add.")
    else:
        print('user not valid')
        return Response("Failed to Add.")


@api_view(['GET'])
def token_details(request, pk):
    coin = models.Token.objects.get(token_sym=pk)
    serializer = serializers.TokenSerializer(coin, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def prices(request):
    coin = models.Token.objects.all()
    serializer = serializers.TokenSerializer(coin, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def token_price(request, pk):
    coin = models.Token.objects.all()
    serializer = serializers.TokenSerializer(coin, many=False)

    return Response(serializer.data)

