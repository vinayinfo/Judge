from accounts.models import Profiles, UserType
from rest_framework import serializers
import random
import string

def get_random_string(length):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(length))


class UserTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'type']


class ProfilesSerializer(serializers.ModelSerializer):
    user_type_id = serializers.IntegerField(write_only=True)
    password = serializers.CharField(read_only=True)
    class Meta:
        model = Profiles
        fields = ['first_name', 'last_name', 'user_type_id', 'organisation', 'phone', 'password']

    def create(self, validated_data):
        profile = Profiles.objects.create(**validated_data)
        pwd = get_random_string(8)
        self.context['request'].session['password']=pwd
        profile.set_password(pwd)
        profile.save()
        return profile
