from django.contrib import admin
from .models import MyUser
from datetime import datetime, timezone


class MyUserAdmin(admin.ModelAdmin):
    readonly_fields = ('last_login', 'is_superuser',
                       'email', 'role', 'gender', 'phone', 'bday')
    exclude = ('password', 'verifying')
    list_display = ('email', 'last_online', 'role')
    list_filter = ('is_staff',)

    def last_online(self, obj):
        difference = datetime.now(timezone.utc)-obj.last_login
        if difference.days > 0:
            return '%d day(s) ago' % (difference.days)
        hours = difference.seconds//3600
        if hours > 0:
            return '%d hour(s) ago' % (hours)
        minutes = difference.seconds//60
        if minutes > 0:
            return '%d minute(s) ago ' % (minutes)

    last_online.short_description = 'Last online'


admin.site.register(MyUser, MyUserAdmin)
