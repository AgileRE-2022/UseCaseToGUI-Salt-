# Generated by Django 4.0.4 on 2022-05-29 05:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0009_remove_usecasescenario_created_at_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usecasescenario',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
        migrations.AddField(
            model_name='usecasescenario',
            name='updated_at',
            field=models.DateTimeField(auto_now=True, null=True),
        ),
    ]
