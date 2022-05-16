from django.shortcuts import render,HttpResponse

# Create your views here.

def home(request):
    context={}
    return render(request,'mainApp/dashboard.html')

def logoutUser(request):
    return HttpResponse('logout')


