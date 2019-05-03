string = 'This is an awesome occasion. This has never happened before'

char_occurances = {}

for char in string :
    char_occurances[char] = char_occurances.get(char, 0) + 1   # 0 is the default, if result would be None

print(char_occurances)


word_occurances = {}

for word in string.split():
    word_occurances[word] = word_occurances.get(word, 0) +1

print(word_occurances)