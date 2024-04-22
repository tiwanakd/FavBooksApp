from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Book(models.Model):
    title = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    genre = models.CharField(max_length=100)
    publication_year = models.IntegerField()
    coverURL = models.URLField(max_length=200)

    def __str__(self):
        return self.title
    
class FavoriteBooks(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}: {self.book}"

    class Meta:
        unique_together = ('user', 'book')