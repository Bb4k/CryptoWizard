import json
import datetime
import requests
import os

ROOT_DATA = "data"
NEXT_FILE = [
    "plan.json",
    "token.json",
    "user.json",
    "transaction.json",
    "investment.json",
    "follow.json"
]
IP_ADDRESS_LOCALHOST = ""


def read_json(path):
    file = open(path)
    data = json.load(file)
    return data['data']


def request(post_url, data):
    response = requests.post(post_url, data=json.dumps(data))
    print(response.text)


def populate():
    for table in NEXT_FILE:
        print(table)
        path = os.path.join(ROOT_DATA, table)
        if os.path.isdir(path):
            for file in os.listdir(path):
                data = read_json(os.path.join(path, file))
                print(data)
        else:
            data = read_json(path)

        for row in data:
            print(row)
            request(f"http://{IP_ADDRESS_LOCALHOST}:8000/api/{table[:-5]}-create/", row)


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


def populate_price():
    url_post_prices = 'http://' + IP_ADDRESS_LOCALHOST + ':8000/api/price-create/'
    for i, token in enumerate(tokens):
        f = open('data/price_history/' + token['token_sym'] + '.json')
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


while True:
    ip_choice = int(input(
        "\033[1mChoose the ip address (1 or 2):\n\033[1;32m1. 127.0.0.1\n\033[91m2. 192.168.0.111\n\033[93mYour choice: "))
    if ip_choice == 1:
        IP_ADDRESS_LOCALHOST = "127.0.0.1"
        populate()
        populate_price()
        break
    elif ip_choice == 2:
        IP_ADDRESS_LOCALHOST = "192.168.0.111"
        populate()
        populate_price()
        break
    else:
        print("Choose between options 1 and 2")
