# Michael J Seth - A History of Korea: From Antiquity to the Present
# Henry J. Amen - Korean for Beginners: Mastering Conversational Korean
# Suki Kim - Without You, There is No Us

class Book:
    # constructor method:
    def __init__(self, name, copies=50):
        self.name = name
        self.copies = copies

    # behavior methods:
    def increase_copies(self, how_many):
        self.copies += how_many

    def decrease_copies(self, how_many):
        self.copies -= how_many


history_of_korea = Book('A History of Korea: From Antiquity to the Present', 30)
korean_for_beginners = Book('Korean for Beginners: Mastering Conversational Korean')
without_you = Book('Without You, There is No Us', 60)

print(history_of_korea.name, history_of_korea.copies)
print(korean_for_beginners.name, korean_for_beginners.copies)
print(without_you.name, without_you.copies)

korean_for_beginners.increase_copies(10)
without_you.decrease_copies(20)

print(history_of_korea.name, history_of_korea.copies)
print(korean_for_beginners.name, korean_for_beginners.copies)
print(without_you.name, without_you.copies)



