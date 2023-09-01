from django.contrib.auth.models import User

from ElectronicSynopsis.models import CustomUser, Section, Item, Data


class UserTable:

    @staticmethod
    def get_user(username):

        users = CustomUser.objects.filter(username=username)
        for user in users:
            return user.json()


class SectionTable:

    @staticmethod
    def get_sections(username):
        users = CustomUser.objects.filter(username=username)
        if len(users) > 0:
            return [section.json() for section in Section.objects.filter(user=users[0])]


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


class DataTable:

    @staticmethod
    def get_data(item_id):
        items = Item.objects.filter(pk=item_id)
        if len(items) > 0:
            return [data.json() for data in Data.objects.filter(item=items[0])]









