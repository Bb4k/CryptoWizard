from django.urls import path
from . import views

urlpatterns = [
    #path('', views.api_overview, name="api-overview"),
    path('users/', views.user_list, name="user-list"),
    path('tokens/', views.token_list, name="token-list"),
    path('token/<str:pk>', views.token_details, name="token")
]
