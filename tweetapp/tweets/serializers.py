from rest_framework import serializers
from django.conf import settings
from .models import Tweet

MAX_LENGTH = settings.MAX_LENGTH
TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class TweetActionSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError(
                "This is not valid action for tweet")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > MAX_LENGTH:
            raise serializers.ValidationError("This tweet is to long")
        return value


class TweetSerializer(serializers.ModelSerializer):
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['id', 'content', 'likes', 'is_retweet', 'parent']

    def get_likes(self, obj):
        return obj.likes.count()
