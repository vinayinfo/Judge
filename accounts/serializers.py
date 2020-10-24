from accounts.models import Profiles, UserType
from rest_framework import serializers

# Serializers define the API representation.
class UserTypeSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = UserType
        fields = ['id', 'type']


class ProfilesSerializer(serializers.HyperlinkedModelSerializer):

    class Meta:
        model = Profiles
        fields = ['first_name', 'last_name', 'user_type_id', 'organisation', 'phone']
