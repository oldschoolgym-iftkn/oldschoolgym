from django.conf import settings
from jwt import decode as jwt_decode
from django.db import close_old_connections
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from django.contrib.auth import get_user_model
from urllib.parse import parse_qs


class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        close_old_connections()
        # token =  # TODO: спарсити access token
        try:
            UntypedToken(token)
        except (InvalidToken, TokenError) as error:
            print(error)
            return
        else:
            decode_info = jwt_decode(
                token, settings.SECRET_KEY, algorithm=['HS256'])
            current_user = get_user_model().objects.get(
                id=decode_info["user_id"])
        return self.inner(dict(scope, user=current_user))
