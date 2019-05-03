
def cls():
    """ Clear the lines on the screen """
    for ignore in range(100):
        print()


my_str = 'Welcome to act001.py'

cls()

print(f'type: {type(my_str)}, value: \'{my_str}\', length: {len(my_str)}')

for ch in my_str:
    print(f'char: {ch}  - ASCII #: {ord(ch)}')   # ord() returns the ascii code

for i in range(9818, 9828):
    print(chr(i), end=' ')    # chr() returns ascii/unicode character of given number
    # unicode glyph chart: www.unicode.org


    


