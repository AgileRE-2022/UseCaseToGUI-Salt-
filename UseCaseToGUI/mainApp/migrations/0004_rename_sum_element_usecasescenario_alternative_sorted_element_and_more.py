# Generated by Django 4.0.4 on 2022-05-25 08:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0003_action_use_case_scenario'),
    ]

    operations = [
        migrations.RenameField(
            model_name='usecasescenario',
            old_name='sum_element',
            new_name='alternative_sorted_element',
        ),
        migrations.AddField(
            model_name='usecasescenario',
            name='elements',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='usecasescenario',
            name='exception_sorted_element',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='usecasescenario',
            name='normal_sorted_element',
            field=models.TextField(null=True),
        ),
    ]
