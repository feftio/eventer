from django.utils import timezone
from distutils.command.upload import upload
from django.db import models
from user.models import User

def get_upload_path(instance, filename):
    return '{0}/{1}'.format(instance.user.username, filename)

class Event(models.Model):
    TAGS_CHOICES = ()

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, to_field="username")
    name = models.CharField(max_length=100, unique=True, error_messages={
        'unique': 'The event with name you wrote is already created.'
    })
    image = models.ImageField(upload_to=get_upload_path, blank=True, null=True)
    start_date = models.DateTimeField(null=True)
    end_date = models.DateTimeField(null=True)
    description = models.CharField(max_length=500, default="")
    tags = models.JSONField()
    created_at = models.DateTimeField(default=timezone.now())
