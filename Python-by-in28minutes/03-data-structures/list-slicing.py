# coding=utf-8

numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine']

print(len(numbers))

print(numbers[2:6])  # slicing, 6 is exclusive

print(numbers[1:8:2])  # slicing, 2 is steps

print(numbers[::-1])  # slicing, :: default 0-last, -1 reverse order

del numbers [5:7] # delete index 5,6

print(numbers)

numbers[3:5] = ['három', 'négy']  # replace a slice, index 3, 4

print(numbers)