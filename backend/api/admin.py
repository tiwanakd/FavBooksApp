from django.contrib import admin
from .models import Book, FavoriteBooks
from import_export.admin import ImportExportModelAdmin

# Register your models here.
admin.site.register(Book, ImportExportModelAdmin)
admin.site.register(FavoriteBooks, ImportExportModelAdmin)
