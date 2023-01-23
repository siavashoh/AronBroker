from django.urls import path
from . import views

app_name = "aron"

urlpatterns = [
    path("", views.index, name="index"),
]
