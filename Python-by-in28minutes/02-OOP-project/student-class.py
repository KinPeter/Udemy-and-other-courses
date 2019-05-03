from builtins import len, sum, max, min


class Student:
    def __init__(self, name, list_of_marks):
        self.name = name
        self.marks = list_of_marks

    def get_number_of_marks(self):
        return len(self.marks)

    def get_sum_of_marks(self):
        return sum(self.marks)

    def determine_maximum_mark(self):
        return max(self.marks)

    def determine_minimum_mark(self):
        return min(self.marks)

    def determine_average(self):
        return sum(self.marks) / len(self.marks)

    def add_new_mark(self, new_mark):
        self.marks.append(new_mark)

    def remove_mark_at_index(self, index):
        self.marks.pop(index)


peti = Student('Peter Kin', [78, 69, 36, 59])

print('\n', peti.name, peti.marks)
print(peti.get_number_of_marks())
print(peti.get_sum_of_marks())
print(peti.determine_maximum_mark())
print(peti.determine_minimum_mark())
print(peti.determine_average())

peti.add_new_mark(30)

print('\n', peti.name, peti.marks)
print(peti.get_number_of_marks())
print(peti.get_sum_of_marks())
print(peti.determine_maximum_mark())
print(peti.determine_minimum_mark())
print(peti.determine_average())

peti.remove_mark_at_index(4)

print('\n', peti.name, peti.marks)
print(peti.get_number_of_marks())
print(peti.get_sum_of_marks())
print(peti.determine_maximum_mark())
print(peti.determine_minimum_mark())
print(peti.determine_average())