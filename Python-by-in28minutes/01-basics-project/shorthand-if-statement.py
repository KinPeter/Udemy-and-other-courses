number = 5

# instead of
# if number % 2 == 0 :
#     isEven = True
# else:
#     isEven = False

# we can use:

isEven = number % 2 == 0  # = True

# or add other value:

isEven = 'Yes' if number % 2 == 0 else 'No'

print(isEven)
