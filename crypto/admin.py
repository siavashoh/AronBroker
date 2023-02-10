from django.contrib import admin
from .models import Currency, CryptoData

class CryptoDataAdmin(admin.ModelAdmin):
    list_display = (
        "currency",
        "time_period_start",
        "time_period_end",
        "time_open",
        "time_close",
        "rate_open",
        "rate_high",
        "rate_low",
        "rate_close",
    )
    list_filter = ("currency",)

admin.site.register(CryptoData, CryptoDataAdmin)

class CurrencyAdmin(admin.ModelAdmin):
    list_display = ("name", "fa_name", "base", "quote", "fa_quote")
    list_filter = ("name",)

admin.site.register(Currency, CurrencyAdmin)
