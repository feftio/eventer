from typing import OrderedDict
from django.utils.translation import gettext_lazy as _
from rest_framework.exceptions import ValidationError
from core import constant


class TagsValidator:
    def __call__(self, attrs: OrderedDict):
        tags = attrs.get('tags', [])
        if not tags:
            raise ValidationError(detail='No tags.')
        for tag in tags:
            if tag not in constant.TAGS:
                raise ValidationError(detail='Wrong tags.')


class CityValidator:
    def __call__(self, attrs: OrderedDict):
        city = attrs.get('city', None)
        if city not in constant.CITIES:
            raise ValidationError(detail='Wrong city.')
