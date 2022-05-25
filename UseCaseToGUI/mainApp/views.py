from django.http import JsonResponse
import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from django.http import HttpResponse

from django.contrib import messages 

# Create your views here.
from .models import *
from .forms import  CreateUserForm


def registerPage(request):
    form = CreateUserForm()
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            form = CreateUserForm(request.POST)
            if form.is_valid():
                form.save()
                user = form.cleaned_data.get('username')
                messages.success(request, 'Account was created for ' + user)
                return redirect('login')

        context = {'form':form}
        return render(request, 'mainApp/register.html', context)

def loginPage(request):
    if request.user.is_authenticated:
        return redirect('home')
    else:
        if request.method == 'POST':
            username = request.POST['username']
            password = request.POST['password']
        
            user = authenticate(request, username=username, password=password)
            
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.info(request, 'Username OR password is incorrect')

        context = {}
        return render(request, 'mainApp/login.html', context)

def logoutUser(request):
    logout(request)
    return redirect('login')

@login_required(login_url='login')
def home(request):
    context={}
    return render(request,'mainApp/index.html')

@login_required(login_url='login')
def useCaseScenario(request):
    context={}
    return render(request,'mainApp/useCaseScenario.html')

@login_required(login_url='login')
def createUseCaseScenario(request):
    if request.method == "POST":
        # Create usecasescenario model
        ucs = UseCaseScenario.objects.create(actor=request.POST['actor'], feature=request.POST['featureName'], feature_description=request.POST['featureDescription'], pre_condition=request.POST['preCondition'], post_condition=request.POST['postCondition'], sum_element=request.POST['sumEl'])
        
        # Craete action
        actions = json.loads(request.POST['actions'])
        for el in actions :
            role = el['role']
            action_ucs = el['action']
            type_of_scenario = el['typeOfUCS']
            list_element = el['listElement']
            input_element = el['inputElement']

            action=Action.objects.create(use_case_scenario=ucs, role=role,type_of_scenario=type_of_scenario, action=action_ucs, list_element=list_element, input_element=input_element)
            action.save()
        
        return JsonResponse({"success":"success"})


@login_required(login_url='login')
def layoutElement(request):
    context={}
    return render(request,'mainApp/layoutElement.html')


