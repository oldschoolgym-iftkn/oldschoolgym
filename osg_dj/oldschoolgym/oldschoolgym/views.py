from django.urls import reverse
from django.http import HttpResponseRedirect


def swagger_redirect(request):
    return HttpResponseRedirect(reverse('schema-swagger-ui'))
