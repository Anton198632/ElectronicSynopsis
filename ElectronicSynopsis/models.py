from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CASCADE


class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)


class Section(models.Model):

    user = models.ForeignKey(CustomUser, on_delete=CASCADE)
    title = models.CharField(max_length=256)
    icon = models.CharField(max_length=128, blank=True)

    class Meta:
        indexes = [models.Index(fields=['user'])]


class Item(models.Model):

    section = models.ForeignKey(Section, on_delete=CASCADE)
    owner = models.ForeignKey('Item', default=None, blank=True, null=True, on_delete=CASCADE)
    title = models.CharField(max_length=256)
    icon = models.CharField(max_length=128, blank=True)

    tags = models.CharField(max_length=1024, blank=True)

    class Meta:
        indexes = [models.Index(fields=['title', 'tags'])]


class Data(models.Model):

    item = models.ForeignKey(Item, on_delete=CASCADE)
    order_id = models.IntegerField()
    type = models.CharField(max_length=64)
    data_content = models.TextField(max_length=4096)

    class Meta:
        indexes = [models.Index(fields=['data_content'])]









