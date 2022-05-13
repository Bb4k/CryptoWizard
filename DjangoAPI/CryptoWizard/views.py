from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpRequest

from rest_framework.decorators import api_view
from rest_framework.response import Response

from . import models
from . import serializers


@api_view(['GET'])
def user_list(request):
    users = models.WizardUser.objects.all()
    serializer = serializers.UserSerializer(users, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def token_list(request):
    coins = models.Token.objects.all()
    serializer = serializers.TokenSerializer(coins, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def token_details(request, pk):
    coin = models.Token.objects.get(token_sym=pk)
    serializer = serializers.TokenSerializer(coin, many=False)

    return Response(serializer.data)
