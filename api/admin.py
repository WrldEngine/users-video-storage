from django.contrib import admin
from .models import Users, Videos, Comments


@admin.register(Users)
class UsersAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "username",
        "is_superuser",
        "date_joined",
        "verified",
    ]

    search_fields = ("username",)


@admin.register(Videos)
class VideosAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "title",
        "video",
        "date",
    ]

    search_fields = ("title",)


@admin.register(Comments)
class CommentsAdmin(admin.ModelAdmin):
    list_display = [
        "id",
        "content",
        "author",
        "video_id",
        "date",
    ]

    search_fields = ("author",)
