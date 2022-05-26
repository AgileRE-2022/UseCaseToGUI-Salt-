from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name="home"),

    path('register/', views.registerPage , name="register"),
    path('login/', views.loginPage , name="login"),
    path('logout/', views.logoutUser , name="logout"),

    path('useCaseScenario/', views.useCaseScenario , name="useCaseScenario"),
    path('createUseCaseScenario/', views.createUseCaseScenario, name="createUseCaseScenario"),
    
    path('layoutElement/<str:pk>/', views.layoutElement , name="layoutElement"),

    path('result/<str:pk>/', views.result, name="result"),
    path('updateUCSSalt/<str:pk>/', views.updateUCSSalt, name="updateUCSSalt"),



]