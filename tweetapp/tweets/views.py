import random
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
import random
from .forms import TweetForm
from django.utils.http import is_safe_url
from django.conf import settings
from .serializers import TweetCreateSerializer, TweetActionSerializer, TweetSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

ALLOWED_HOSTS = settings.ALLOWED_HOSTS

# Create your views here.


def home_view(request, *args, **kwargs):
    return render(request, 'pages/home.html', context={}, status=200)


def tweets_list_view(request, *args, **kwargs):
    return render(request, 'tweets/list.html')


def tweets_detail_view(request, tweet_id, *args, **kwargs):
    return render(request, 'tweets/detail.html', context={"tweet_id": tweet_id})


def tweets_profile_view(request, username,  *args, **kwargs):
    return render(request, 'tweets/profile.html', context={
        "profile_username": username
    })
