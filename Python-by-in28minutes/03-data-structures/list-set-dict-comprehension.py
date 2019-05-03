
# list comprehension of squares of numbers 1 to 10:
squares_list = [ i*i for i in range(1, 11) ]

print('list: ', squares_list)

# set comprehension of squares of numbers 1 to 10:
squares_set = { i*i for i in range(1, 11) }

print('set: ', squares_set)

# dict comprehension of squares of numbers 1 to 10:
squares_dict = { i : i*i for i in range(1, 11) }

print('dict: ', squares_dict)




