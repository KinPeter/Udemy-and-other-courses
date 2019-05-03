class Book:
    def __init__(self, id, name, author):
        self.id = id
        self.name = name
        self.author = author
        self.review = []

    def __repr__(self):
        return repr((self.id, self.name, self.author, self.review))

    def add_review(self, review):
        self.review.append(review)


class Review:
    def __init__(self, id, review, rating):
        self.id = id
        self.review = review
        self.rating = rating

    def __repr__(self):
        return repr((self.id, self.review, self.rating))


book = Book(101, 'Object Oriented Programming with Python', 'Ranga')
book.add_review(Review(10, "Great Book", 5))
book.add_review(Review(11, "Awesome", 5))

print(book)
