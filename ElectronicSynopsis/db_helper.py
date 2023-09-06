from django.contrib.auth.models import User

from ElectronicSynopsis.models import CustomUser, Section, Item, Data, Attachment


class UserTable:

    @staticmethod
    def get_user(username):

        users = CustomUser.objects.filter(username=username)
        for user in users:
            return user.json()

    @staticmethod
    def add_user(username, password):
        users = CustomUser.objects.filter(username=username)
        if len(users) == 0:
            user = CustomUser.objects.create(username=username, password=password)
            return user.json()

        return users[0].json()

    @staticmethod
    def delete_user(username):
        CustomUser.objects.filter(username=username).delete()


class SectionTable:

    @staticmethod
    def get_sections(username):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            return [section.json().get("section") for section in Section.objects.filter(user=users[0])]

    @staticmethod
    def add_section(username, title):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            section = Section.objects.create(user=users[0], title=title)
            return section.json()

    @staticmethod
    def set_section_icon(section_id, icon):
        Section.objects.filter(pk=section_id).update(icon=icon)

    @staticmethod
    def delete_section(section_id):
        Section.objects.filter(pk=section_id).delete()


class ItemTable:

    @staticmethod
    def __create_tree_structure(items):
        tree = []
        for item in items:
            # img = str(item.icon_id.image_logo)
            # img = img[img.find("/"):]
            node = {
                'id': item.pk,
                'title': item.title,
                'icon':  item.icon
            }
            children = item.item_set.all().order_by('title')
            if children:
                node['childs'] = ItemTable.__create_tree_structure(children)
            tree.append(node)
        return tree

    @staticmethod
    def get_items(section_id):

        sections = Section.objects.filter(pk=section_id)

        if len(sections) > 0:
            # Получите корневые элементы из модели Catalog
            root_items = Item.objects.filter(owner_id__isnull=True, section=sections[0]).order_by('title')

            # Создайте дерево структуры
            return ItemTable.__create_tree_structure(root_items)

    @staticmethod
    def add_item(title, section_id, owner_id=None):

        sections = Section.objects.filter(pk=section_id)

        if len(sections) > 0:

            item = Item.objects.create(
                section=sections[0],
                title=title,
                owner=Item.objects.filter(pk=owner_id)[0] if owner_id is not None else None
            )

            return item.json()

    @staticmethod
    def set_item_icon(item_id, icon):
        Item.objects.filter(pk=item_id).update(icon=icon)

    @staticmethod
    def delete_item(item_id):
        Item.objects.filter(pk=item_id).delete()


class DataTable:

    @staticmethod
    def get_data(item_id):
        items = Item.objects.filter(pk=item_id)
        if len(items) > 0:
            return [data.json().get("data") for data in Data.objects.filter(item=items[0])]
        return []

    @staticmethod
    def add_data(item_id, order_id, type_, data_content):
        items = Item.objects.filter(pk=item_id)
        if len(items) > 0:
            data = Data.objects.create(
                item=items[0],
                order_id=order_id,
                type=type_,
                data_content=data_content

            )

            return data.json()

    @staticmethod
    def delete_data(data_id):
        Data.objects.filter(pk=data_id).delete()

    @staticmethod
    def update_data(data_id, order_id, type_, data_content):
        Data.objects.filter(pk=data_id).update(
            order_id=order_id, type=type, data_content=data_content
        )



class AttachmentTable:

    @staticmethod
    def get_attachment_number():
        attach = Attachment.objects.all()

        if len(attach) > 0:
            counter = attach[0].counter
        else:
            counter = Attachment.objects.create(counter=0)

        Attachment.objects.all().update(counter=counter + 1)
        return counter















