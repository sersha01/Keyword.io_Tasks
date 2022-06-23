from django.urls import path
from . import views
from .views import MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)



urlpatterns = [
    #Authentications
    path('signup', views.userSignup, name='signup'),
    path('login', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh', TokenRefreshView.as_view(), name='token_refresh'),

    #Actions
    path('create/book', views.createBook, name='create_book'),
    path('retrieve/books', views.retrieveBooks, name='retrieve_books'),
    path('update/book', views.updateBook, name='update_book'),
    path('delete/book', views.deleteBook, name='delete_book'),
]