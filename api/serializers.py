from rest_framework import serializers
from .models import Users, Videos


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "email",
            "password",
        )
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = Users.objects.create_user(**validated_data)
        return user


class UserShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = ("id", "username", "first_name", "last_name")


class VideoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = "__all__"
