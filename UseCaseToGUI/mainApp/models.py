from pyexpat import model
from django.db import models

# Create your models here.

class UseCaseScenario(models.Model):
    actor = models.CharField(max_length=200,null=True)
    feature = models.CharField(max_length=200,null=True)
    feature_description = models.CharField(max_length=200,null=True)
    pre_condition = models.CharField(max_length=200,null=True)
    post_condition = models.CharField(max_length=200,null=True)
    sum_element = models.TextField(null=True)

class Action(models.Model):
    use_case_scenario = models.ForeignKey(UseCaseScenario, null=True, on_delete=models.SET_NULL)
    role = models.CharField(max_length=200,null=True)
    type_of_scenario = models.CharField(max_length=200,null=True)
    action = models.TextField(null=True)
    list_element = models.TextField(null=True)
    input_element = models.TextField(null=True)

    # display name in admin panel
    def __str__(self):
        display_name = 'Action(' + str(self.id) + ') - fk(' + str(self.use_case_scenario.id) + ')'
        return  display_name
    

    