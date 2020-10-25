from accounts.models import Profiles, UserType
from rest_framework import viewsets
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.decorators import action
from rest_framework.response import Response
from accounts.serializers import ProfilesSerializer, UserTypeSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profiles.objects.all()
    serializer_class = ProfilesSerializer
    permission_classes = []

    @authentication_classes([])
    def create(self, request, *args, **kwargs):
        return super(ProfileViewSet, self).create(request, *args, **kwargs)

    @action(methods=['get'], detail=False)
    def get_user_type(self, request, pk=None):
        serializer = UserTypeSerializer(UserType.objects.all(), many=True)
        return Response(serializer.data)
