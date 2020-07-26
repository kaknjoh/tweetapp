from django.shortcuts import render
from django.http import Http404
# Create your views here.
from .models import Profile


def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404
    profile_obj = qs.first()
    context = {
        'username': username,
        "profile": profile_obj
    }
    return render(request, 'profiles/detail.html', context)
