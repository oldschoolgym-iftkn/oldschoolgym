from random import randint
from drf_yasg import openapi


def generate_confirmation_code() -> str:
    return str(randint(100, 999999)).zfill(6)


def get_header_params():
    header_param = openapi.Parameter(
        'Authorization', openapi.IN_HEADER, description="Access token", type=openapi.IN_HEADER)
    return [header_param]
