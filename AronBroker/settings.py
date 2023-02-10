"""
Django settings for AronBroker project.

Generated by 'django-admin startproject' using Django 2.2.12.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os

# get env variables from .env file
from dotenv import load_dotenv

load_dotenv()




# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "*xrv)kij(-#ju3u)3f$-hi_3gj^=+ve)o6ryvfqv_4virth&xn"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ["*"]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "aron",
    "crypto",
    # celery
    "django_celery_beat",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "AronBroker.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, "templates")],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "AronBroker.wsgi.application"


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": os.path.join(BASE_DIR, "db.sqlite3"),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = "/static/"
if not DEBUG:
    STATIC_ROOT = os.path.join(BASE_DIR, "static/")
else:
    STATICFILES_DIRS = (os.path.join(BASE_DIR, "static/"),)


MEDIA_URL = "/media/"
MEDIA_ROOT = os.path.join(BASE_DIR, "media/")


# CryptoAPI settings

CRYPTO_API_KEY = os.environ.get("CRYPTO_API_KEY", None)
CRYPTO_API_BASE_URL = os.environ.get("CRYPTO_API_BASE_URL", None)
CRYPTO_API_BASE_CURRENCY = os.environ.get("CRYPTO_API_BASE_CURRENCY", None)
CRYPTO_API_BASE_TIME_FRAME = os.environ.get("CRYPTO_API_BASE_TIME_FRAME", None)

if not CRYPTO_API_KEY:
    raise Exception("CRYPTO_API_KEY is not defined")
if not CRYPTO_API_BASE_URL:
    raise Exception("CRYPTO_API_BASE_URL is not defined")
if not CRYPTO_API_BASE_CURRENCY:
    raise Exception("CRYPTO_API_BASE_CURRENCY is not defined")
if not CRYPTO_API_BASE_TIME_FRAME:
    raise Exception("CRYPTO_API_BASE_TIME_FRAME is not defined")


# Celery settings

CELERY_BROKER_URL = os.environ.get("CELERY_BROKER_URL", None)
CELERY_RESULT_BACKEND = os.environ.get("CELERY_BROKER_URL", None)
CELERY_ACCEPT_CONTENT = ["application/json"]
CELERY_TASK_SERIALIZER = "json"
CELERY_RESULT_SERIALIZER = "json"
CELERY_TASK_TRACK_STARTED = True
CELERY_RESULT_EXTENDED = True
CELERY_TIMEZONE = "UTC"

from celery.schedules import crontab

CELERY_BEAT_SCHEDULE = {
    "run_every_night_second": {
        "task": "crypto.tasks.some_task",
        "schedule": crontab(minute="*"),
    },
}