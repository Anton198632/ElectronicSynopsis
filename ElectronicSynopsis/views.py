import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt

from ElectronicSynopsis.db_helper import UserTable, SectionTable, ItemTable, DataTable, AttachmentTable
from ElectronicSynopsis.settings import BASE_DIR


class Main(TemplateView):

    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name, {})


# проверка авторизации
def get_authorization_data_handle(request):

    if not request.user.is_authenticated:
        return JsonResponse({"user": "anonymous_user"})

    else:
        return JsonResponse(UserTable.get_user(request.user.username))


def check_authorizations(func):
    def wrapper(request):

        # if not request.user.is_authenticated:
        #     return JsonResponse({"registration": "logout"})

        return func(request)
    return wrapper


# авторизация
@csrf_exempt
def login_handle(request):
    body = json.loads(request.body.decode(encoding='utf-8'))

    user = UserTable.get_user(body.get("login"))
    if user:

        user_auth = authenticate(username=body.get("login"), password=body.get("password"))
        if user_auth is not None:
            login(request, user=user_auth)
            return JsonResponse(user)
        else:
            return JsonResponse({"registration": "password error"})

    else:
        return JsonResponse({"registration": "user not exists"})


# выход
def logout_handle(request):
    logout(request)

    return JsonResponse({"registration": "logout"})


@check_authorizations
def get_sections_handle(request):

    username = request.GET.get("username")
    sections = SectionTable.get_sections(username)

    return JsonResponse({"sections": sections})


@csrf_exempt
def upload_section_image_handle(request):

    section_id = request.GET.get("sectionId")
    file = request.FILES.get("file").file

    ava_path = BASE_DIR / f"attachments/avatars_sections/{section_id}"

    SectionTable.set_section_icon(int(section_id), f"avatars_sections/{section_id}")

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse({"sectionIconPath": f"avatars_sections/{section_id}"})


@check_authorizations
def add_new_section_handle(request):

    username = request.GET.get("username")
    title = request.GET.get("title")

    section = SectionTable.add_section(username, title)

    return JsonResponse(section)


@check_authorizations
def get_items_handle(request):

    section_id = request.GET.get("section_id")

    items = ItemTable.get_items(section_id)

    return JsonResponse({"items": items})


@csrf_exempt
def upload_item_image_handle(request):

    item_id = request.GET.get("itemId")
    file = request.FILES.get("file").file

    ava_path = BASE_DIR / f"attachments/avatars_items/{item_id}"

    ItemTable.set_item_icon(int(item_id), f"avatars_items/{item_id}")

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse({"icon": f"avatars_items/{item_id}"})


@check_authorizations
def add_new_item_handle(request):

    section_id = request.GET.get("sectionId")
    item_id = None if request.GET.get("itemId") == "null" else int(request.GET.get("itemId"))
    title = request.GET.get("title")

    ItemTable.add_item(title, section_id, owner_id=item_id)

    items = ItemTable.get_items(section_id)
    return JsonResponse({"items": items})


@check_authorizations
def get_data_handle(request):

    item_id = request.GET.get("itemId")

    data = DataTable.get_data(int(item_id))

    return JsonResponse({"data": data})


@csrf_exempt
def upload_data_image_handle(request):
    file = request.FILES.get("file").file

    attach_number = AttachmentTable.get_attachment_number()

    ava_path = BASE_DIR / f"attachments/images/{attach_number}"

    with open(ava_path, "wb") as f:
        f.write(file.read())

    return JsonResponse({"imagePath": f"{attach_number}"})