from urllib.parse import parse_qs
from django.conf import settings
from jwt import decode as jwt_decode
from django.db import close_old_connections
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import TokenError
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async


@database_sync_to_async
def get_user(user_id):
    try:
        return get_user_model().objects.get(pk=user_id)
    except get_user_model().DoesNotExist:
        print('User not found!')
        return AnonymousUser()


class JWTAuthMiddleware:
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        close_old_connections()
        url_q = parse_qs(scope['query_string'])
        if not url_q.get(b'authorization')[0]:
            scope['user'] = AnonymousUser()
            return await self.inner(dict(scope), receive, send)
        token = url_q.get(b'authorization')[0].decode('utf-8')
        try:
            UntypedToken(token)
        except TokenError as error:
            print(error)
            scope['user'] = AnonymousUser()
            return await self.inner(dict(scope), receive, send)
        else:
            decode_info = jwt_decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            scope['user'] = await get_user(user_id=decode_info['user_id'])
        return await self.inner(dict(scope), receive, send)


def MyTokenMiddleware(inner):
    return JWTAuthMiddleware(inner)
