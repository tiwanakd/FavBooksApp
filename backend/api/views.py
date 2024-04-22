from django.shortcuts import render
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import BookSerializer, FavoriteBooksSerializer, UserSerializer
from .models import Book, FavoriteBooks
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework.exceptions import APIException
from openai import OpenAI, OpenAIError, AuthenticationError
from dotenv import load_dotenv
import os
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.

class BookListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        return Book.objects.all()

class FilteredListView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        genre =  self.request.query_params.get('genre')
        return Book.objects.filter(genre__iexact=genre)
    
class FavoriteBooksView(generics.ListCreateAPIView):
    serializer_class = FavoriteBooksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return FavoriteBooks.objects.filter(user=user)
    
    def perform_create(self, serializer):
        try:
            serializer.save(user=self.request.user)
        except IntegrityError:
            raise APIException({"message": "Book Already in Favorites."})
        except Exception as error:
            return Response({"message": f"{error}"})


class FavoriteBookRemove(APIView):

    serializer_class = FavoriteBooksSerializer
    permission_classes = [IsAuthenticated]

    
    def delete(self, request, format=None):
        book_id = request.query_params.get('book', None)

        if book_id:
            fav_book = FavoriteBooks.objects.filter(book = book_id)

        if fav_book.exists():
            try:
                fav_book.delete()
                return Response({"message": "Favorite Book deleted successfully."}, status=204)
            except:
                return Response({"message": "Error Occured while deleting the book."}, status=400)
        else:
            return Response({"message": "Book not found with the given ID."}, status=400)
        
    
class CreateUserView(generics.CreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

class GetBookWithIdView(generics.ListAPIView):
    serializer_class = BookSerializer
    permission_classes = [AllowAny]
    authentication_classes = []

    def get_queryset(self):
        book_id = self.kwargs.get('id')
        return Book.objects.filter(id=book_id)
    
class GetFavBookwithIdView(generics.ListAPIView):
    serializer_class = FavoriteBooksSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        fav_book_id = self.kwargs.get('id')
        return FavoriteBooks.objects.filter(id=fav_book_id)

class BookSummaryView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request, id):
        try:
            book = Book.objects.get(id = id)
        except Book.DoesNotExist:
            return Response({"error": "Book not found"}, status=404)
        
        summary = self.generate_summary(book.title)
        return Response({"title": book.title, "summary": summary})

    def generate_summary(self, title):
        load_dotenv()

        try:
            openai_client = OpenAI(
                api_key=os.getenv("OPENAI_API_KEY")
            )
            #Intialize the query to the OpenAI API
            ai_summary = openai_client.chat.completions.create(
                model='gpt-3.5-turbo',
                messages=[
                    {"role": "system", "content": "You are a Librarian who has read a lot of books and \
                    who can provide summaries of books."},
                    {"role": "user", "content": f"Give me a one-two line summary of book {title} and \
                    do not include the book name in summary"}
                    ]
                )
        except AuthenticationError:
            return Response({"error": "Authication Error with OpenAI"}, status=400)
        except OpenAIError as err:
            return Response({"error": "Error generating Summary"}, status=400)
        
        return ai_summary.choices[0].message.content

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['first_name'] = user.first_name

        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer
    


    

    
