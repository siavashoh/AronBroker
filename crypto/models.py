from django.db import models


class Currency(models.Model):
    name = models.CharField(max_length=50)
    fa_name = models.CharField(max_length=50)
    base = models.CharField(max_length=10)
    quote = models.CharField(max_length=10, default="USD")
    fa_quote = models.CharField(max_length=10, default="دلار")
    last_24h = models.DecimalField(decimal_places=2, max_digits=10)

    def save(self, *args, **kwargs):
        self.base = self.base.upper()
        self.quote = self.quote.upper()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.name} ({self.base}/{self.quote})"

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "fa_name": self.fa_name,
            "base": self.base,
            "quote": self.quote,
            "fa_quote": self.fa_quote,
            "last_24h": float(self.last_24h),
        }

class CryptoData(models.Model):
    currency = models.ForeignKey(Currency, on_delete=models.CASCADE)
    time_period_start = models.DateTimeField()
    time_period_end = models.DateTimeField()
    time_open = models.DateTimeField()
    time_close = models.DateTimeField()
    rate_open = models.DecimalField(decimal_places=2, max_digits=10)
    rate_high = models.DecimalField(decimal_places=2, max_digits=10)
    rate_low = models.DecimalField(decimal_places=2, max_digits=10)
    rate_close = models.DecimalField(decimal_places=2, max_digits=10)

    def to_dict(self):
        return {
            "time_period_start": self.time_period_start.day,
            "time_period_end": self.time_period_end.day,
            "rate_open": float(self.rate_open),
            "rate_high": float(self.rate_high),
            "rate_low": float(self.rate_low),
            "rate_close": float(self.rate_close),
        }

    @staticmethod
    def to_dict_list(data):
        return [d.to_dict() for d in data]