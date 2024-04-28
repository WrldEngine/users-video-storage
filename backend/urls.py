from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.views.static import serve

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.views import (
    register_user,
    get_user,
    upload_video,
    get_videos,
    get_profile_info,
    like_video,
    verify_email,
)

user_patterns = [
    path("", get_user, name="get_users"),
    path("<int:pk>/", get_user, name="get_current_user"),
    path("me/", get_profile_info, name="get_profile_info"),
]

video_patterns = [
    path("", get_videos, name="videos_list"),
    path("<uuid:id>/", get_videos, name="current_video"),
    path("<uuid:id>/like/", like_video, name="like_video"),
]

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/login/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/login/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("api/users/", include(user_patterns)),
    path("api/signup/", register_user, name="signup"),
    path("api/upload_video/", upload_video, name="video"),
    path("api/videos/", include(video_patterns)),
    path("verify/", verify_email, name="verify_email"),
    re_path(r"^media/(?P<path>.*)$", serve, {"document_root": settings.MEDIA_ROOT}),
    re_path(r"^static/(?P<path>.*)$", serve, {"document_root": settings.STATIC_ROOT}),
]
