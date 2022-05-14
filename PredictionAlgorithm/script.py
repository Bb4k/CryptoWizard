import datetime
import json
import requests

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import pandas_datareader as web
import datetime as dt

from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras.layers import Dense, Dropout, LSTM
from tensorflow.keras.models import Sequential

# BTC, Ethereum, Elrond, Solana, Dogecoin, Binance Coin
crypto_currencies = [
    {
        'id': 1,
        'name': "BTC",
        'year': 2016,
        'month': 1,
        'day': 1,

    },
    {
        'id': 2,
        'name': "ETH",
        'year': 2016,
        'month': 1,
        'day': 1
    },
    {
        'id': 6,
        'name': "EGLD",
        'year': 2020,
        'month': 10,
        'day': 10
    },
    {
        'id': 4,
        'name': "SOL",
        'year': 2020,
        'month': 10,
        'day': 10
    },
    {
        'id': 5,
        'name': "DOGE",
        'year': 2016,
        'month': 1,
        'day': 1
    },
    {
        'id': 3,
        'name': "BNB",
        'year': 2016,
        'month': 1,
        'day': 1
    }
]
against_currency = "USD"

for crypto_currency in crypto_currencies:
    start = dt.datetime(crypto_currency['year'], crypto_currency['month'], crypto_currency['day'])
    end = dt.datetime.now()

    data = web.DataReader(f'{crypto_currency["name"]}-{against_currency}', 'yahoo', start, end)

    # Prepare Data
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data['Close'].values.reshape(-1, 1))

    prediction_days = 100
    x_train, y_train = [], []

    for x in range(prediction_days, len(scaled_data)):
        x_train.append(scaled_data[x - prediction_days:x, 0])
        y_train.append(scaled_data[x, 0])

    x_train, y_train = np.array(x_train), np.array(y_train)
    x_train = np.reshape(x_train, (x_train.shape[0], x_train.shape[1], 1))

    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(x_train.shape[1], 1))), model.add(Dropout(0.2))
    model.add(LSTM(units=50, return_sequences=True)),
    model.add(Dropout(0.2))
    model.add(LSTM(units=50))
    model.add(Dropout(0.2))
    model.add(Dense(units=1))

    model.compile(optimizer='adam', loss='mean_squared_error')
    model.fit(x_train, y_train, epochs=50, batch_size=32)

    test_start = dt.datetime(2020, 10, 10) + dt.timedelta(days=-prediction_days)
    test_end = dt.datetime.now()

    test_data = web.DataReader(f'{crypto_currency["name"]}-{against_currency}', 'yahoo', test_start, test_end)
    actual_prices = test_data['Close'].values

    total_dataset = pd.concat((data["Close"], test_data["Close"]), axis=0)

    model_inputs = total_dataset[len(total_dataset) - len(test_data) - prediction_days:].values

    support_array = total_dataset[
                    len(total_dataset) - len(test_data) - prediction_days - len(test_data):len(total_dataset) - len(
                        test_data) - len(test_data)]
    support_array = np.array(support_array)

    model_inputs2 = model_inputs[prediction_days:]
    support_array2 = np.concatenate([support_array, model_inputs2])

    model_inputs = support_array2
    model_inputs = model_inputs.reshape(-1, 1)
    model_inputs = scaler.fit_transform(model_inputs)

    x_test = []

    for x in range(prediction_days, len(model_inputs)):
        x_test.append(model_inputs[x - prediction_days:x, 0])

    x_test = np.array(x_test)
    x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
    prediction_prices = model.predict(x_test)
    prediction_prices = scaler.inverse_transform(prediction_prices)

    # [DEBUG ONLY] Generate graphs
    # plt.figure(figsize=(20, 10))
    # plt.plot(actual_prices, color='black', label='Actual Prices')
    # plt.plot(prediction_prices, color='green', label='Predicted Prices')
    # plt.title(f'{crypto_currency["name"]} price prediction'), plt.xlabel('Time')
    # plt.ylabel('Price')
    # plt.legend(loc='upper left')
    # plt.show()

    # print(actual_prices)
    # print(prediction_prices)
    # print(len(prediction_prices), len(actual_prices), data.size)

    real_data = [model_inputs[len(model_inputs) - prediction_days:len(model_inputs) + 1, 0]]
    real_data = np.array(real_data)
    real_data = np.reshape(real_data, (real_data.shape[0], real_data.shape[1], 1))
    prediction = model.predict(real_data)
    prediction = scaler.inverse_transform(prediction)
    # print(float(prediction[0]))

    # [DEBUG ONLY] Generate history data
    # f = open("../PopulateDatabase/price_history/" + crypto_currency["name"] + ".json", "w")
    # history_data = {'data': []}
    # for i in range(len(actual_prices)):
    #     print(i)
    #     print(float(actual_prices[i]), float(prediction_prices[i]))
    #     history_data['data'].append([str(test_data.index[i].timestamp()), float(actual_prices[i]), float(prediction_prices[i])])
    #
    # f.write(json.dumps(history_data))
    # f.close()

    headers = {'content-type': 'application/json'}
    url_put_token = 'http://127.0.0.1:8000/api/token-update/' + crypto_currency['name']
    response_put = requests.put(url_put_token, headers=headers, data=json.dumps({
        "token_sym": crypto_currency['name'],
        "token_next_price": float(prediction[0])
    }))
    print(response_put.text)

    url_post_price = 'http://127.0.0.1:8000/api/price-create/'
    date_value = datetime.datetime.fromtimestamp(float(str(test_data.index[-1].timestamp())))
    response_post = requests.post(url_post_price, data=json.dumps({
        "price_token_id": crypto_currency['id'],
        "price_timestamp": f"{date_value:%Y-%m-%d}",
        "price_real": float(actual_prices[-1]),
        "price_predicted": float(prediction_prices[-1])
    }))
    print(response_post.text)
