import random
from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse

from django.utils.http import is_safe_url
from django.conf import settings
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
ALLOWED_HOSTS = settings.ALLOWED_HOSTS

User = get_user_model()


@ api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    other_user_qs = User.objects.filter(username=username)
    if me.username == username:
        my_followers_qs = me.profile.followers.all()
        return Response({"count": my_followers_qs.count()}, status=200)
    if not other_user_qs.exists():
        return Response({}, status=400)
    other = other_user_qs.first()
    profile = other.profile
    data = {}
    try:
        data = request.data
    except:
        pass
    print(data)
    action = data.get('action')
    if action == 'follow':
        profile.followers.add(me)
    elif action == 'unfollow':
        profile.followers.remove(me)
    else:
        pass
    current_followers_qs = profile.followers.all()
    return Response({"count": current_followers_qs.count()}, status=200)
