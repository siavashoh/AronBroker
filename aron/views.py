from django.shortcuts import render
from crypto.models import CryptoData, Currency



def index(request):
    # get all currencies
    currency = Currency.objects.all()
    # get all data for each currency
    data = []
    for c in currency:
        d = CryptoData.objects.filter(currency=c)
        data.append({"currency": c.to_dict(), "data": CryptoData.to_dict_list(d)})

    return render(request, "aron/aron.html", {"data": data})
