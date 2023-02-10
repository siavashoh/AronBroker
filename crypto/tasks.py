from AronBroker.celery import app


def some_task(self):
    print("Hello World")
    return "Hello World"


import requests
from datetime import datetime, timedelta, timezone
from django.conf import settings
from crypto.models import Currency, CryptoData


def get_data_from_crypto_api(currency, base_url, base_time_frame, api_key, days=7):
    end = datetime.now(timezone.utc)
    start = end - timedelta(days=days)
    end = end.strftime("%Y-%m-%dT%H:%M:%S")
    start = start.strftime("%Y-%m-%dT%H:%M:%S")
    url = f"{base_url}exchangerate/{currency.base}/{currency.quote}/history?period_id={base_time_frame}&&time_start={start}&time_end={end}"
    headers = {"X-CoinAPI-Key": api_key}
    res = requests.get(url, headers=headers)
    if res.status_code != 200:
        raise Exception({"msg": res.json(), "status_code": res.status_code})
    return res.json()

@app.task(bind=True)
def get_crypto_data():
    # remove all data in CryptoData
    CryptoData.objects.all().delete()
    
    # get data from settings
    CRYPTO_API_KEY = getattr(settings, "CRYPTO_API_KEY")
    CRYPTO_API_BASE_URL = getattr(settings, "CRYPTO_API_BASE_URL")
    CRYPTO_API_BASE_TIME_FRAME = getattr(settings, "CRYPTO_API_BASE_TIME_FRAME")

    # get all currencies
    currency = Currency.objects.all()

    # get data from crypto api for each currency
    for c in currency:
        data = get_data_from_crypto_api(
            c,
            CRYPTO_API_BASE_URL,
            CRYPTO_API_BASE_TIME_FRAME,
            CRYPTO_API_KEY,
            days=7,
        )
        for d in data:
            time_period_start = datetime.strptime(
                d["time_period_start"], "%Y-%m-%dT%H:%M:%S.%f0Z"
            ).strftime("%Y-%m-%dT%H:%M:%S")
            time_period_end = datetime.strptime(
                d["time_period_end"], "%Y-%m-%dT%H:%M:%S.%f0Z"
            )
            time_open = datetime.strptime(d["time_open"], "%Y-%m-%dT%H:%M:%S.%f0Z")
            time_close = datetime.strptime(d["time_close"], "%Y-%m-%dT%H:%M:%S.%f0Z")
            rate_open = d["rate_open"]
            rate_high = d["rate_high"]
            rate_low = d["rate_low"]
            rate_close = d["rate_close"]
            
            CryptoData.objects.create(
                currency=c,
                time_period_start=time_period_start,
                time_period_end=time_period_end,
                time_open=time_open,
                time_close=time_close,
                rate_open=rate_open,
                rate_high=rate_high,
                rate_low=rate_low,
                rate_close=rate_close,
            )
        
        last_24h = CryptoData.objects.filter(currency=c).order_by("-time_period_end")
        
        # get percent change in last 24h
        change = last_24h[0].rate_close - last_24h[1].rate_close
        change = (change * 100)/last_24h[0].rate_close 
        c.last_24h = change
        c.save()

    return {"msg": "success"}
