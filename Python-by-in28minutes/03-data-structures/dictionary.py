occurances = dict(a=5, b=6, c=8)

print(occurances)

occurances['d'] = 10

print(occurances)

print(occurances['d'])
print(occurances.get('d'))

print(occurances.keys())
print(occurances.values())
print(occurances.items())  # gives them back as TUPLES

for (key,value) in occurances.items():
    print(f'{key} : {value}')

del occurances['a']

print(occurances)

