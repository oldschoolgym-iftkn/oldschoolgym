from random import SystemRandom
from drf_yasg import openapi
from django.core.cache import cache


def generate_confirmation_code() -> str:
    return str(SystemRandom().randint(100, 999999)).zfill(6)


def get_header_params(name: str = 'Authorization', description: str = 'Access token'):
    header_param = openapi.Parameter(
        name, openapi.IN_HEADER, description=description, type=openapi.IN_HEADER)
    return header_param


def get_query_params(name: str, description: str = '', type=openapi.TYPE_INTEGER):
    query_param = openapi.Parameter(name, openapi.IN_QUERY,
                                    description=description, type=type)
    return query_param


def get_form_params(name: str, description: str = '', type=openapi.TYPE_FILE):
    form_param = openapi.Parameter(
        name, openapi.IN_FORM, description=description, type=type)
    return form_param


def clear_cache_by_key(key:str):
    for key_in_cache in cache.keys('*'):
        if key in key_in_cache:
            cache.delete(key_in_cache)
