import uuid
import os
from django.utils import timezone
from django.db import models
from user.models import User


def get_upload_path(instance, filename):
    extension = os.path.splitext(filename)[1]
    return '{0}/{1}{2}'.format(instance.user.id, uuid.uuid4(), extension)


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username", db_column="username")
    name = models.CharField(max_length=100, unique=True, error_messages={
        'unique': 'The event with name you wrote is already created.'
    })
    image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    description = models.JSONField(default=list)
    tags = models.JSONField()
    created_at = models.DateTimeField(default=timezone.now)
    city = models.CharField(max_length=50, blank=True, null=True)
    registered = models.JSONField(default=list)
    watched = models.IntegerField(default=0)
    liked = models.JSONField(default=list)
    active = models.BooleanField(default=True)


class Image(models.Model):
    image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="id", db_column="user_id")
