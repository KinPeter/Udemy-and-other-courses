# coding=utf-8

numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

numbers_length_four = []

for number in numbers:
    if len(number) == 4:
        numbers_length_four.append(number)

print(numbers_length_four)

# -------------------------------------------------------
# The same result with only 1 line:

numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

numbers_length_four = [ number for number in numbers if len(number) == 4 ]

print(numbers_length_four)

# -------------------------------------------------------
# One more example:

values = [3, 6 ,9 ,1, 4, 15, 6, 3]

values_even = [value for value in values if value % 2 == 0]
values_odd = [value for value in values if value % 2 == 1]
print(values_even)
print(values_odd)