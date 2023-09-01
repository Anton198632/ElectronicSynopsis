from abc import ABCMeta, abstractmethod, ABC

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.db.models import CASCADE


class JsonBuilder:
    __metaclass__ = ABCMeta

    @abstractmethod
    def json(self):
        return None


class CustomUser(AbstractUser, JsonBuilder):
    is_admin = models.BooleanField(default=False)
    avatar = models.CharField(max_length=200, blank=True)

    def json(self):
        return {
            "user": {
                "id": self.pk,
                "username": self.username,
                "first_name": self.first_name,
                "is_admin": self.is_admin,
                "avatar": self.avatar
            }
        }

    def __str__(self):
        return f"{self.pk}. {self.username}"


class Section(models.Model, JsonBuilder):

    user = models.ForeignKey(CustomUser, on_delete=CASCADE)
    title = models.CharField(max_length=256)
    icon = models.CharField(max_length=128, blank=True)

    def json(self):
        return {
            "section": {
                "id": self.pk,
                "title": self.title,
                "icon": self.icon
            }
        }

    class Meta:
        indexes = [models.Index(fields=['user'])]

    def __str__(self):
        return f"{self.pk} {self.title}"


class Item(models.Model, JsonBuilder):

    section = models.ForeignKey(Section, on_delete=CASCADE)
    owner = models.ForeignKey('Item', default=None, blank=True, null=True, on_delete=CASCADE)
    title = models.CharField(max_length=256)
    icon = models.CharField(max_length=128, blank=True)

    tags = models.CharField(max_length=1024, blank=True)

    def json(self):
        return {
            "item": {
                "id": self.pk,
                "owner": self.owner.json() if self.owner is not None else None,
                "title": self.title,
                "icon": self.icon
            }
        }

    class Meta:
        indexes = [models.Index(fields=['title', 'tags'])]

    def __str__(self):
        return f"{self.pk} {self.title}"


class Data(models.Model, JsonBuilder):

    item = models.ForeignKey(Item, on_delete=CASCADE)
    order_id = models.IntegerField()
    type = models.CharField(max_length=64)
    data_content = models.TextField(max_length=4096)

    def json(self):
        return {
            "data": {
                "id": self.pk,
                "order_id": self.order_id,
                "type": self.type,
                "data_content": self.data_content
            }
        }

    class Meta:
        indexes = [models.Index(fields=['data_content'])]


class Attachment(models.Model):
    counter = models.IntegerField()









