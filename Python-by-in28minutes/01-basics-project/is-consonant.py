vowel_string = "aeiou"

char = input('Enter a character: ')

if char.isalpha() and char.lower() not in vowel_string :
    print(f'{char} is a consonant')
else:
    print(f'{char} is not a consonant')

