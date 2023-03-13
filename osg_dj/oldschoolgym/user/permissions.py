from rest_framework.permissions import BasePermission


class VerifiedUserOnly(BasePermission):
    message = 'User must verify email to provide access!'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated and
                request.user.role == 0 and request.user.verifying.is_activate)


class VerifiedCoachOnly(BasePermission):
    message = 'Coach must verify email to provide access!'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated and
                request.user.role == 1 and request.user.verifying.is_activate)
