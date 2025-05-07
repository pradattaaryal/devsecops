# repositories.py
from .models import Author

class AuthorRepository:
    def get_all_authors(self):
        return Author.objects.all()

    def get_author_by_id(self, author_id):
        return Author.objects.filter(author_id=author_id).first()

    def create_author(self, name, bio):
        author = Author(name=name, bio=bio)
        author.save()
        return author

    def update_author(self, author_id, name=None, bio=None):
        author = Author.objects.filter(author_id=author_id).first()
        if author:
            if name:
                author.name = name
            if bio:
                author.bio = bio
            author.save()
        return author

    def delete_author(self, author_id):
        author = Author.objects.filter(author_id=author_id).first()
        if author:
            author.delete()
        return author
