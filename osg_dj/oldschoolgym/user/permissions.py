from rest_framework.permissions import BasePermission


class VerifiedUserOnly(BasePermission):
    message = 'Only users with verified email have access!'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated and
                request.user.role == 0 and request.user.verifying.is_activate)


class VerifiedCoachOnly(BasePermission):
    message = 'Only coaches with verified email have access!'

    def has_permission(self, request, view):
        return (request.user and request.user.is_authenticated and
                request.user.role == 1 and request.user.verifying.is_activate)
