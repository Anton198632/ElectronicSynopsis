# Generated by Django 4.2.4 on 2023-09-01 04:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('ElectronicSynopsis', '0003_attachment'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='avatar',
            field=models.CharField(blank=True, max_length=200),
        ),
    ]