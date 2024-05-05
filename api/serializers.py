from rest_framework import serializers

import re
from .models import Users, Videos, Comments

USERNAME_LETTER_MATCH_PATTERN = re.compile(r"^[a-zA-Z]")


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


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = (
            "id",
            "username",
            "first_name",
            "last_name",
            "verified",
            "email",
            "password",
        )

        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, data):
        if not USERNAME_LETTER_MATCH_PATTERN.match(data["username"]):
            raise serializers.ValidationError(
                "Имя пользователя должно состоять из латинских букв"
            )

        if not len(data["password"]) > 5:
            raise serializers.ValidationError("Пароль должен быть больше 5 символов")

        return data

    def create(self, validated_data):
        user = Users.objects.create_user(**validated_data)
        return user
