from django.contrib import admin
from django.urls import path

from ElectronicSynopsis.db_helper import UserTable, SectionTable, ItemTable, DataTable
from ElectronicSynopsis.views import Main

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", Main.as_view())
]


user = UserTable.get_user("Anton")

sections = SectionTable.get_sections(user.get("user").get("username"))

items = ItemTable.get_items(sections[0].get("section").get("id"))

dats = DataTable.get_data(items[0].get("id"))

pass