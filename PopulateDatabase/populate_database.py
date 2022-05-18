import json
import datetime
import requests

tokens = [
    {
        'token_name': 'Bitcoin',
        'token_sym': 'BTC',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/bitcoin.png',
        'token_next_price': 1000
    },
    {
        'token_name': 'Ethereum',
        'token_sym': 'ETH',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/ethereum.png',
        'token_next_price': 2000
    },
    {
        'token_name': 'Binance Coin',
        'token_sym': 'BNB',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/binance-coin.png',
        'token_next_price': 3000
    },
    {
        'token_name': 'Solana',
        'token_sym': 'SOL',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/solana.png',
        'token_next_price': 4000
    },
    {
        'token_name': 'Dogecoin',
        'token_sym': 'DOGE',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/dogecoin.png',
        'token_next_price': 5000
    },
    {
        'token_name': 'Elrond',
        'token_sym': 'EGLD',
        'token_img': 'https://i-invdn-com.investing.com/ico_flags/80x80/v32/elrond.png',
        'token_next_price': 6000
    },
]


def populate_tokens():
    url_post_tokens = 'http://192.168.0.111:8000/api/token-create/'

    for token in tokens:
        response = requests.post(url_post_tokens, data=json.dumps(token))
        print(response.text)


def populate_price():
    url_post_prices = 'http://192.168.0.111:8000/api/price-create/'
    for i, token in enumerate(tokens):
        f = open('price_history/' + token['token_sym'] + '.json')
        data = json.load(f)
        for price in data['data']:
            date_value = datetime.datetime.fromtimestamp(float(price[0]))
            response = requests.post(url_post_prices, data=json.dumps({
                "price_token_id": i + 1,
                "price_timestamp": f"{date_value:%Y-%m-%d}",
                "price_real": price[1],
                "price_predicted": price[2]
            }))
            print(response.text)

        f.close()


def populate_plans():
    url_post_plans = 'http://192.168.0.111:8000/api/plan-create/'
    plans = [
        {
            "plan_name": "Basic",
            "plan_price": "FREE",
            "plan_img": "https://i.ibb.co/Ryz48Pp/status-bronze.webp",
            "plan_benefits": "See predictions for 5 cryptos"
        },
        {
            "plan_name": "Gold",
            "plan_price": "$10/mo.",
            "plan_img": "https://i.ibb.co/VJxt4hR/status-gold.webp",
            "plan_benefits": "See predictions for 10 cryptos & Get tips when to buy/sell"
        },
        {
            "plan_name": "Star",
            "plan_price": "$25/mo.",
            "plan_img": "https://i.ibb.co/VmW8X2c/status-star.webp",
            "plan_benefits": "See predictions for UNLIMITED cryptos&Get tips when to buy/sell&Get notifications when to buy/sell"
        },
        {
            "plan_name": "Plus",
            "plan_price": "$50/mo.",
            "plan_img": "https://i.ibb.co/Fns4MG6/status-diamond.webp",
            "plan_benefits": "See predictions for UNLIMITED cryptos&Get tips when to buy/sell&Get notifications when to buy/sell&Set the bot to automatically buy/sell crypto coins"
        },
    ]
    for plan in plans:
        response = requests.post(url_post_plans, data=json.dumps(plan))
        print(response.text)


populate_tokens()
populate_price()
populate_plans()
