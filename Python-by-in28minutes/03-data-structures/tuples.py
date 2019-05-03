def create_peter():
    return 'Peter', 1985, 'Hungary'   # returns a tuple with multiple values


peter = create_peter()          # peter variable becomes the return of the function - a tuple

print(type(peter))              # check type of 'peter'

name, year, country = peter     # new variables become values of 'peter' respectively: first value, name, etc

print(name, country, year)

print(len(peter))               # 'list' methods also work


# defining tuple with only 1 value:
tup = 1,
print('tup: ', tup, 'type: ', type(tup))




