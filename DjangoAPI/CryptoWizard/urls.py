from django.urls import path
from . import views

urlpatterns = [
    path('users/', views.user_list, name="user-list"),
    path('tokens/', views.token_list, name="token-list"),
    path('token/<str:pk>', views.token_details, name="token"),
    path('user-create/', views.user_create, name="create-user"),
    path('user/<str:email>', views.user_id, name="get-user"),
    path('user-data/<str:email>', views.user_data, name="user-data"),
    path('plan-list/', views.plan_list, name="plan-list"),
    path('plan/<str:_id>', views.plan)
]
