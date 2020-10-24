from django.contrib import admin
from accounts.models import Profiles
# Register your models here.

class ProfilesAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'user_type', 'organisation', 'phone')
    

admin.site.register(Profiles, ProfilesAdmin)
