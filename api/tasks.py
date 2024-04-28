from celery import shared_task

from django.core.mail import send_mail
from django.utils.html import strip_tags
from rest_framework.response import Response


@shared_task
def send_verification_message(message, email):
    subject = "Verify Email"

    send_mail(subject, strip_tags(message))

    return "Sent"
