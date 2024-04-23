from .serializers import UserSerializer, UserShowSerializer, VideoPostSerializer
from .models import Users, Videos
from .permissions import IsOwner
from .tasks import send_verification_message
from .tokens import account_activation_token

from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.decorators import permission_classes, api_view
from rest_framework.exceptions import APIException
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.template.loader import render_to_string


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def verify_email(request):
    current_site = get_current_site(request)
    
    message = render_to_string(
        'verify_email.html', 
        {
            'request': request,
            'user': request.user,
            'domain': current_site.domain,
            'uid': urlsafe_base64_encode(force_bytes(request.user.pk)),
            'token': account_activation_token.make_token(request.user),
        }
    )

    send_verification_message.delay(message, request.user.email)

    return Response({"Status": "OK"})


@api_view(["GET"])
@permission_classes([AllowAny])
def get_user(request, pk=None):
    if pk is not None:
        try:
            user = Users.objects.get(pk=pk)
            serializer = UserShowSerializer(user)

        except Users.DoesNotExist:
            raise APIException("Current User Does Not Exist")

    else:
        user = Users.objects.all()
        serializer = UserShowSerializer(user, many=True)

    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsOwner])
def get_profile_info(request):
    try:
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

    except:
        raise APIException("You dont have permissions to access this resource")


@api_view(["POST"])
@permission_classes([IsAdminUser])
def upload_video(request):
    request_data = request.data.copy()
    request_data["author"] = request.user.id

    serializer = VideoPostSerializer(data=request_data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@permission_classes([AllowAny])
def get_videos(request, pk=None):

    if pk is not None:
        try:
            video = get_object_or_404(Videos, pk=pk)

            if request.user.is_authenticated:
                video.views_accounts.add(request.user)

            video.update_views()
            serializer = VideoPostSerializer(video)

            return Response(serializer.data)

        except Videos.DoesNotExist:
            raise APIException("Current Video Does Not Exist")

    videos = Videos.objects.all()

    serializer = VideoPostSerializer(videos, many=True)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def like_video(request, pk):
    video = get_object_or_404(Videos, pk=pk)

    if request.user in video.likes.all():
        video.likes.remove(request.user)
        liked = False
    else:
        video.likes.add(request.user)
        liked = True

    serializer = VideoPostSerializer(video)
    return Response({"detail": serializer.data, "liked": liked})
