# coding=utf-8
from builtins import reversed, sorted, len

numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

numbers.reverse()  # replaces the elements in reversed order

print(numbers)

#---------------------------------------------------------------------------------------------------
numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

for number in reversed(numbers):   # the original list remains unchanged, only reverse in the loop
    print(number, end=' ')

print()

#---------------------------------------------------------------------------------------------------
numbers.sort()   # sorts the original list alphabetically
# numbers.sort(key = len)
# numbers.sort(reverse = True)

print(numbers)

#---------------------------------------------------------------------------------------------------
numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

for number in sorted(numbers):   # the original list remains unchanged, only sorts in the loop
    print(number, end=' ')

print()

for number in sorted(numbers, key = len):   # sorts according to string length
    print(number, end=' ')

print()

for number in sorted(numbers, key = len, reverse = True):   # also puts in reverse order
    print(number, end=' ')

print()