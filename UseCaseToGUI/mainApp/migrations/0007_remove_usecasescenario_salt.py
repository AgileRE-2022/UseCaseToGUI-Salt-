# Generated by Django 4.0.4 on 2022-05-27 09:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0006_rename_alternative_sorted_element_usecasescenario_alternative_element_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='usecasescenario',
            name='salt',
        ),
    ]
