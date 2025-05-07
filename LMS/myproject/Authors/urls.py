# urls.py
from django.urls import path
from .views import AuthorListView, AuthorDetailView

urlpatterns = [
    path('', AuthorListView.as_view(), name='author-list'),
    path('authors/<int:author_id>/', AuthorDetailView.as_view(), name='author-detail'),
]
