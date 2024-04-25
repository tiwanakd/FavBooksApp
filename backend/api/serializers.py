from rest_framework import serializers
from .models import Book, FavoriteBooks
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", 'first_name', 'username', "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data['first_name'],
            username=validated_data['username'],
            password=validated_data['password'],
        )
        return user

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ["id", "title", "author", "genre", "publication_year", "cover_url"]

class FavoriteBooksSerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteBooks
        fields = "__all__"
        extra_kwargs = {"user":{"read_only": True}}
