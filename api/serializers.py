from rest_framework import serializers
from .models import Users, Videos, Comments


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

class UserViewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
        )

class VideoPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Videos
        fields = "__all__"


class CommentsViewSerializer(serializers.ModelSerializer):
    author = UserViewSerializer()
    date = serializers.DateTimeField(format="%d/%b/%Y")

    class Meta:
        model = Comments
        fields = "__all__"


class CommentsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comments
        fields = ["content", "video", "author"]