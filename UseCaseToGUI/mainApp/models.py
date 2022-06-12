from pyexpat import model
from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class UseCaseScenario(models.Model):
    actor = models.CharField(max_length=200,null=True)
    feature = models.CharField(max_length=200,null=True)
    feature_description = models.CharField(max_length=200,null=True)
    pre_condition = models.CharField(max_length=200,null=True)
    post_condition = models.CharField(max_length=200,null=True)
    normal_element = models.TextField(null=True)
    alternative_element = models.TextField(null=True)
    exception_element = models.TextField(null=True)
    normal_salt = models.TextField(null=True)
    alternative_salt = models.TextField(null=True)
    exception_salt = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)


class Action(models.Model):
    use_case_scenario = models.ForeignKey(UseCaseScenario, null=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=200,null=True)
    type_of_scenario = models.CharField(max_length=200,null=True)
    action = models.TextField(null=True)
    list_element = models.TextField(null=True)
    input_element = models.TextField(null=True)
    created_by = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)

    # display name in admin panel
    def __str__(self):
        try:
            display_name = 'Action(' + str(self.id) + ') - fk(' + str(self.use_case_scenario.id) + ')'
        except:
            display_name = 'Action(' + str(self.id) + ') - fk(' + '' + ')'

        return  display_name

# Put your code below!

# class Sistem(models.Model):

# class Actor(models.Model):
    

    