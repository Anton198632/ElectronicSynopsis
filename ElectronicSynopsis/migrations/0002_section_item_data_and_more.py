# Generated by Django 4.2.4 on 2023-08-31 05:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('ElectronicSynopsis', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Section',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('icon', models.CharField(blank=True, max_length=128)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Item',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=256)),
                ('icon', models.CharField(blank=True, max_length=128)),
                ('tags', models.CharField(blank=True, max_length=1024)),
                ('owner', models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.CASCADE, to='ElectronicSynopsis.item')),
                ('section', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ElectronicSynopsis.section')),
            ],
        ),
        migrations.CreateModel(
            name='Data',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('order_id', models.IntegerField()),
                ('type', models.CharField(max_length=64)),
                ('data_content', models.TextField(max_length=4096)),
                ('item', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='ElectronicSynopsis.item')),
            ],
        ),
        migrations.AddIndex(
            model_name='section',
            index=models.Index(fields=['user'], name='ElectronicS_user_id_98f2cc_idx'),
        ),
        migrations.AddIndex(
            model_name='item',
            index=models.Index(fields=['title', 'tags'], name='ElectronicS_title_d11c94_idx'),
        ),
        migrations.AddIndex(
            model_name='data',
            index=models.Index(fields=['data_content'], name='ElectronicS_data_co_89981a_idx'),
        ),
    ]
