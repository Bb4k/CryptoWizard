from django.urls import path
from . import views

urlpatterns = [

    path('users/', views.user_list, name="user-list"),
    path('user-create/', views.user_create, name="create-user"),
    path('user/<str:email>', views.user_id, name="get-user"),
    path('user-data/<str:email>', views.user_data, name="user-data"),

    path('tokens/', views.token_list, name="token-list"),
    path('token/<str:pk>', views.token_details, name="token"),
    path('token-create/', views.token_create, name="token-create"),
    path('token-update/<str:token_sym>', views.token_update, name="token-update"),

    path('plan-list/', views.plan_list, name="plan-list"),
    path('plan/<str:_id>', views.plan, name="user-plan"),
    path('plan-create/', views.plan_create, name="plan-create"),

    path('investments/<str:user_id>', views.user_investments, name="user-investments"),
    path('investment-create/', views.investment_create, name="investment-create"),

    path('transactions/<str:user_id>', views.user_transactions, name="user-transactions"),
    path('transaction-create/', views.transaction_create, name="transaction-create"),

    path('follows/<str:user_id>', views.user_follow, name="user-follows"),
    path('follow-create/', views.follow_create, name="follow-create"),

    path('price-create/', views.price_create, name="price-create"),
    path('price/<str:token_id>', views.price_get_by_token, name="price-get-by-token"),

]
