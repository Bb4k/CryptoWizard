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
def user_id(request, email):
    _user = models.WizardUser.objects.get(user_email=email)
    serializer = serializers.UserSerializer(_user, many=False)

    return Response(serializer.data)


@api_view(['GET'])
def user_data(request, email):
    _user = models.WizardUser.objects.get(user_email=email)
    user_serializer = serializers.UserSerializer(_user, many=False)

    user_plan = requests.get(f"http://127.0.0.1:8000/api/plan/{user_serializer.data['user_id']}")
    user_investments = requests.get(f"http://127.0.0.1:8000/api/investments/{user_serializer.data['user_id']}")
    user_follows = requests.get(f"http://127.0.0.1:8000/api/follows/{user_serializer.data['user_id']}")

    print(user_plan.json())
    print(user_investments.json())
    print(user_follows.json())
    print(user_serializer.data)

    print([user_plan.json()] + [user_investments.json()] + [user_follows.json()] + [user_serializer.data])
    return Response([user_serializer.data] + [user_plan.json()] + [user_investments.json()] + [user_follows.json()])


@api_view(['GET'])
def plan_list(request):
    plans = models.Plan.objects.all()
    serializer = serializers.PlanSerializer(plans, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def plan(request, _id):
    _plan = models.Plan.objects.get(plan_id=_id)
    serializer = serializers.PlanSerializer(_plan, many=False)
    print(serializer.data)
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


@api_view(['GET'])
def user_investments(request, user_id):
    investments = models.WizardUserInvestments.objects.filter(investment_user_id=user_id)
    serializer = serializers.WizardUserInvestmentsSerializer(investments, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def user_transactions(request, user_id):
    transactions = models.WizardUserTransactions.objects.filter(investment_user_id=user_id)
    serializer = serializers.WizardUserTransactionsSerializer(transactions, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def prices(request):
    coin = models.Token.objects.all()
    serializer = serializers.TokenSerializer(coin, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def token_price(request, pk):
    coin = models.Token.objects.filter(token_id=pk)
    serializer = serializers.TokenSerializer(coin, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def user_follow(request, user_id):
    user_follows = models.WizardUserFollow.objects.filter(follow_user_id=user_id)
    serializer = serializers.WizardFollowSerializer(user_follows, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def price_get_by_token(request, token_id):
    prices = models.Price.objects.filter(price_token_id_id=token_id)
    serializer = serializers.PriceSerializer(prices, many=True)

    return Response(serializer.data)


@api_view(['POST'])
def user_create(request):
    data = JSONParser().parse(request)
    user_pw = data['user_password']
    del data['user_password']
    user_data = data
    user_serializer = serializers.UserSerializer(data=user_data)
    if user_serializer.is_valid():
        user_serializer.save()

        user_data = requests.get(f"http://127.0.0.1:8000/api/user/{user_data['user_email']}")

        pw_data = {
            "pw_user_id": user_data.json()['user_id'],
            "pw_encr_str": user_pw
        }

        pw_serializer = serializers.PasswordSerializer(data=pw_data)

        if pw_serializer.is_valid():
            pw_serializer.save()
            return Response("Added Successfully!!")
        else:
            print('password not valid')
            return Response("Failed to Add.")
    else:
        print('user not valid')
        return Response("Failed to Add.")


@api_view(['POST'])
def token_create(request):
    data = JSONParser().parse(request)
    token = serializers.TokenSerializer(data=data)

    if token.is_valid():
        print("token ok")
        token.save()
        print(token.data)
        return Response("Added Successfully!!")
    else:
        return Response("Failed to Add.")


@api_view(['POST'])
def plan_create(request):
    data = JSONParser().parse(request)
    plan = serializers.PlanSerializer(data=data)

    if plan.is_valid():
        print("plan ok")
        plan.save()
        print(plan.data)
        return Response("Added Successfully!!")
    else:
        return Response("Failed to Add.")


# -- update method --
@api_view(['PUT'])
def token_update(request, token_sym):
    token_data = models.Token.objects.get(token_sym=token_sym)
    serialized_token = serializers.TokenSerializer(instance=token_data, data=request.data)

    if serialized_token.is_valid():
        serialized_token.save()
        return Response("Updated successfully!!")
    else:
        return Response("Failed to update.")


@api_view(['POST'])
def price_create(request):
    data = JSONParser().parse(request)
    price = serializers.PriceSerializer(data=data)

    if price.is_valid():
        price.save()
        return Response("Added Successfully!!")
    else:
        return Response("Failed to Add.")
