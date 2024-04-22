from django.urls import path
from .views import ( BookListView, 
                    FilteredListView, 
                    FavoriteBooksView, 
                    FavoriteBookRemove, 
                    GetBookWithIdView,
                    GetFavBookwithIdView,
                    BookSummaryView )

urlpatterns = [
    path("books/", BookListView.as_view(), name="book-list"),
    path("books/<int:id>", GetBookWithIdView.as_view(), name="get-book-wihtid"),
    path("genrebooks/", FilteredListView.as_view(), name="filetered-book-list"),
    path("mybooks/", FavoriteBooksView.as_view(), name="favoritebooks"),
    path("mybooks/<int:id>/", GetFavBookwithIdView.as_view(), name="get-favbook-wihtid"),
    path("mybooks/delete/", FavoriteBookRemove.as_view(), name="remove-favorite-book"),
    path("books/summary/<int:id>", BookSummaryView.as_view(), name="book-summary")
]