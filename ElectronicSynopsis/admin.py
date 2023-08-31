from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from ElectronicSynopsis.models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser

    list_display = ['username', 'is_admin']

    fieldsets = UserAdmin.fieldsets + ((None, {"fields": ("is_admin", )}),)


admin.site.register(CustomUser, CustomUserAdmin)