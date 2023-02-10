# Generated by Django 4.1.5 on 2023-02-06 15:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Currency",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50)),
                ("fa_name", models.CharField(max_length=50)),
                ("base", models.CharField(max_length=10)),
                ("quote", models.CharField(max_length=10)),
                ("fa_quote", models.CharField(default="دلار", max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name="CryptoData",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("time_period_start", models.DateTimeField()),
                ("time_period_end", models.DateTimeField()),
                ("time_open", models.DateTimeField()),
                ("time_close", models.DateTimeField()),
                ("rate_open", models.DecimalField(decimal_places=2, max_digits=10)),
                ("rate_high", models.DecimalField(decimal_places=2, max_digits=10)),
                ("rate_low", models.DecimalField(decimal_places=2, max_digits=10)),
                ("rate_close", models.DecimalField(decimal_places=2, max_digits=10)),
                (
                    "currency",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="crypto.currency",
                    ),
                ),
            ],
        ),
    ]
