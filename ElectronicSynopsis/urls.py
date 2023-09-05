from django.contrib import admin
from django.urls import path

from ElectronicSynopsis.db_helper import UserTable, SectionTable, ItemTable, DataTable
from ElectronicSynopsis.views import Main, get_authorization_data_handle, login_handle, logout_handle, \
    get_sections_handle, upload_section_image_handle, add_new_section_handle, get_items_handle, \
    upload_item_image_handle, add_new_item_handle, get_data_handle

urlpatterns = [
    path('admin/', admin.site.urls),
    path("", Main.as_view()),

    path("get_authorization_data", get_authorization_data_handle),
    path("login", login_handle),
    path("logout", logout_handle),

    path("get_sections", get_sections_handle),
    path("upload_section_image", upload_section_image_handle),
    path("add_new_section", add_new_section_handle),

    path("get_items", get_items_handle),
    path("upload_item_image", upload_item_image_handle),
    path("add_new_item", add_new_item_handle),

    path("get_data", get_data_handle)

]


# user = UserTable.get_user("Anton")
#
# sections = SectionTable.get_sections(user.get("user").get("username"))
#
# items = ItemTable.get_items(sections[0].get("section").get("id"))
#
# dats = DataTable.get_data(items[0].get("id"))

# user = UserTable.add_user("anton", "Qwerty32")

pass