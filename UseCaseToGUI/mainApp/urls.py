from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),

    path('register/', views.registerPage , name="register"),
    path('login/', views.loginPage , name="login"),
    path('logout/', views.logoutUser , name="logout"),

    path('useCaseScenario/', views.useCaseScenario , name="useCaseScenario"),
    path('createUseCaseScenario/', views.createUseCaseScenario, name="createUseCaseScenario"),
    
    path('layoutElement/', views.layoutElement , name="layoutElement"),



]