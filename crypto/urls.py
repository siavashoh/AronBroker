from django.urls import path
from . import views

app_name = "crypto"

urlpatterns = [
    path("data", views.get_crypto_data, name="index"),
]
