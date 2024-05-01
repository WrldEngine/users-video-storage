import uuid

from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import FileExtensionValidator


class Users(AbstractUser):
    verified = models.BooleanField(null=True, default=False)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "User"


class Videos(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    video = models.FileField(
        upload_to="video_storage",
        null=True,
        validators=[
            FileExtensionValidator(
                allowed_extensions=["MOV", "avi", "mp4", "webm", "mkv"]
            )
        ],
    )
    title = models.CharField(max_length=30_000)
    date = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    likes = models.ManyToManyField(Users, related_name="liked_posts", blank=True)
    views = models.IntegerField(default=0)
    views_accounts = models.ManyToManyField(Users, related_name="views", blank=True)

    def __str__(self):
        return self.title

    def update_views(self, *args, **kwargs):
        self.views += 1
        super(Videos, self).save(*args, **kwargs)

    class Meta:
        verbose_name = "Video"


class Comments(models.Model):
    author = models.ForeignKey(Users, on_delete=models.CASCADE)
    video = models.ForeignKey(Videos, on_delete=models.CASCADE)
    content = models.TextField()
    likes = models.ManyToManyField(Users, related_name="liked_comments", blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content

    class Meta:
        verbose_name = "Comment"
