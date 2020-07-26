from django.test import TestCase

# Create your tests here.
from django.contrib.auth import get_user_model
from .models import Profile


User = get_user_model()


class ProfileTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='abc', password='12345678')
        self.userb = User.objects.create_user(
            username='cba', password='12345678')

    def test_profile_created_via_signal(self):
        qs = Profile.objects.all()
        self.assertEqual(qs.count(), 2)

    def test_following(self):
        first = self.user
        second = self.userb
        first.profile.followers.add(second)  # added a followe
        # from a user, check is the other user being followed
        qs = second.following.filter(user=first)
        self.assertTrue(qs.exists())
        first_user_following_no_one = first.following.all()
        self.assertFalse(first_user_following_no_one.exists())
