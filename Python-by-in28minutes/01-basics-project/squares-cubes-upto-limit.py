def print_squares_upto_limit(limit):
    i = 1
    while i * i < limit :
        print(i * i, end=' ')
        i += 1


def print_cubes_upto_limit(limit):
    i = 1
    while i * i * i < limit :
        print(i * i * i, end=' ')
        i += 1


print_squares_upto_limit(300)
print()
print_cubes_upto_limit(300)

