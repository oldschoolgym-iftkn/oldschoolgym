from django.contrib import admin
from .models import Coach


class CoachAdmin(admin.ModelAdmin):
    # fields = ('type_training', 'experience', 'price',
    #           'info_block', 'additional_block', 'category', 'is_confirmed')
    exclude = ('user_profile',)
    list_display = ('__str__', 'type_training', 'category', 'is_confirmed')
    list_filter = ('type_training', 'category', 'is_confirmed')


admin.site.register(Coach, CoachAdmin)
