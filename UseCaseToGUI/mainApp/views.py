from multiprocessing import context
from django.http import JsonResponse
from django.core import serializers
import json
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.contrib.auth.forms import UserCreationForm
from django.template import Context, Template

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
    return render(request,'mainApp/useCaseScenario.html')

@login_required(login_url='login')
def createUseCaseScenario(request):
    if request.method == "POST":
        # Create usecasescenario object
        ucs = UseCaseScenario.objects.create(actor=request.POST['actor'], feature=request.POST['featureName'], feature_description=request.POST['featureDescription'], pre_condition=request.POST['preCondition'], post_condition=request.POST['postCondition'], normal_element=request.POST['sumEl'], alternative_element=request.POST['sumEl'], exception_element=request.POST['sumEl'])
        
        # Craete action object
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
def showUseCaseScenario(request):
    allUcs = UseCaseScenario.objects.order_by('-id').all()
    context={"allUcs":allUcs}
    return render(request,'mainApp/showUseCaseScenario.html',context)


@login_required(login_url='login')
def layoutElement(request,scenarioType,pk):
    ucs = UseCaseScenario.objects.get(id=pk)
    context={"ucs":ucs, "scenarioType":scenarioType}
    return render(request,'mainApp/layoutElement.html',context)


@login_required(login_url='login')
def result(request,scenarioType,pk):
    ucs = UseCaseScenario.objects.get(id=pk)
    if(scenarioType== 'normal'):
        context={"ucsSalt":ucs.normal_salt,"ucsId":pk,"scenarioType":scenarioType}
    elif(scenarioType=='alternative'):
        context={"ucsSalt":ucs.alternative_salt,"ucsId":pk,"scenarioType":scenarioType}
    elif(scenarioType=='exception'):
        context={"ucsSalt":ucs.exception_salt,"ucsId":pk,"scenarioType":scenarioType}

    return render(request,'mainApp/result.html',context)

        
@login_required(login_url='login')
def updateUCS(request,pk):
    context={}
    if request.method == "POST":
        if(request.POST['scenarioType'] == 'normal'):
            UseCaseScenario.objects.filter(pk=pk).update(normal_element=request.POST['ucsElement'],normal_salt=request.POST['ucsSalt'])
        elif(request.POST['scenarioType'] == 'alternative'):
            UseCaseScenario.objects.filter(pk=pk).update(alternative_element=request.POST['ucsElement'],alternative_salt=request.POST['ucsSalt'])
        else:
            UseCaseScenario.objects.filter(pk=pk).update(exception_element=request.POST['ucsElement'],exception_salt=request.POST['ucsSalt'])
        
        return JsonResponse({"success":'success'})

@login_required(login_url='login')
def formEditUCS(request,pk):
    ucs = UseCaseScenario.objects.get(id=pk)
    actions = serializers.serialize('json',Action.objects.filter(use_case_scenario=ucs)) #query_set to json
    context={'ucs':ucs,'actions':actions}
    return render(request,'mainApp/editUCS.html',context)

def editUseCaseScenario(request):
    if request.method == "POST":
        ucs = UseCaseScenario.objects.get(id=request.POST['idUcs'])
        UseCaseScenario.objects.filter(id=request.POST['idUcs']).update(actor=request.POST['actor'],feature=request.POST['featureName'],feature_description=request.POST['featureDescription'],pre_condition=request.POST['preCondition'],post_condition=request.POST['postCondition'],normal_element=request.POST['sumEl'], alternative_element=request.POST['sumEl'], exception_element=request.POST['sumEl'],normal_salt=None,alternative_salt=None,exception_salt=None)

        old_actions = Action.objects.filter(use_case_scenario=request.POST['idUcs']).delete()
        # Create new action
        actions = json.loads(request.POST['actions'])
        for el in actions :
            role = el['role']
            action_ucs = el['action']
            type_of_scenario = el['typeOfUCS']
            list_element = el['listElement']
            input_element = el['inputElement']

            action=Action.objects.create(use_case_scenario=ucs, role=role,type_of_scenario=type_of_scenario, action=action_ucs, list_element=list_element, input_element=input_element)
            action.save()
        return JsonResponse({"success":'success'})

# Put your code below!

# def addSistem(request):





