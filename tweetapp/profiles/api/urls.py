
from django.contrib import admin
from django.urls import path
from .views import user_follow_view


#
# Endpoint api/profiles/
#
urlpatterns = [
    path('<str:username>/follow', user_follow_view),

]
