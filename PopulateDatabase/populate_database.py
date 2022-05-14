import json
import datetime
import requests

tokens = [
    {
        'token_name': 'Bitcoin',
        'token_sym': 'BTC',
        'token_img': 'https://cdn.coinranking.com/bOabBYkcX/bitcoin_btc.svg',
        'token_next_price': 1000
    },
    {
        'token_name': 'Ethereum',
        'token_sym': 'ETH',
        'token_img': 'https://cdn.coinranking.com/rk4RKHOuW/eth.svg',
        'token_next_price': 2000
    },
    {
        'token_name': 'Binance Coin',
        'token_sym': 'BNB',
        'token_img': 'https://cdn.coinranking.com/B1N19L_dZ/bnb.svg',
        'token_next_price': 3000
    },
    {
        'token_name': 'Solana',
        'token_sym': 'SOL',
        'token_img': 'https://cdn.coinranking.com/yvUG4Qex5/solana.svg',
        'token_next_price': 4000
    },
    {
        'token_name': 'Dogecoin',
        'token_sym': 'DOGE',
        'token_img': 'https://cdn.coinranking.com/H1arXIuOZ/doge.svg',
        'token_next_price': 5000
    },
    {
        'token_name': 'Elrond',
        'token_sym': 'EGLD',
        'token_img': 'https://cdn.coinranking.com/X62ruAuZQ/Elrond.svg',
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
    pass


populate_tokens()
populate_price()
