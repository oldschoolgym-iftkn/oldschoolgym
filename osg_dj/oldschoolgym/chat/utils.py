from drf_yasg import openapi


def get_query_params(name: str, description: str, type=openapi.TYPE_INTEGER):
    return [openapi.Parameter(name, openapi.IN_QUERY,
                              description=description, type=type)]
