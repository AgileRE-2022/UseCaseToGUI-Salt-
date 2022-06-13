from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),

    path('register/', views.registerPage , name="register"),
    path('login/', views.loginPage , name="login"),
    path('logout/', views.logoutUser , name="logout"),

    path('showUseCaseScenario/', views.showUseCaseScenario , name="showUseCaseScenario"),

    path('useCaseScenario/', views.useCaseScenario , name="useCaseScenario"),

    path('createUseCaseScenario/', views.createUseCaseScenario, name="createUseCaseScenario"),
    
    path('layoutElement/<str:scenarioType>/<str:pk>/', views.layoutElement , name="layoutElement"),

    path('result/<str:scenarioType>/<str:pk>/', views.result, name="result"),
    path('updateUCS/<str:pk>/', views.updateUCS, name="updateUCS"),

    path('formEditUCS/<str:pk>/', views.formEditUCS, name="formEditUCS"),
    path('editUseCaseScenario/', views.editUseCaseScenario, name="editUseCaseScenario"),

    # Put your code below!
    
    # path('addSistem/', views.addSistem, name="addSistem"),

    path('deleteUcs/<str:pk>/', views.deleteUcs, name="deleteUcs"),


]