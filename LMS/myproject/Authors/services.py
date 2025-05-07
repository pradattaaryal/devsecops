# services.py
from .repositories import AuthorRepository

class AuthorService:
    def __init__(self):
        self.author_repository = AuthorRepository()

    def get_all_authors(self):
        return self.author_repository.get_all_authors()

    def get_author_by_id(self, author_id):
        return self.author_repository.get_author_by_id(author_id)

    def create_author(self, name, bio):
        return self.author_repository.create_author(name, bio)

    def update_author(self, author_id, name=None, bio=None):
        return self.author_repository.update_author(author_id, name, bio)

    def delete_author(self, author_id):
        return self.author_repository.delete_author(author_id)
