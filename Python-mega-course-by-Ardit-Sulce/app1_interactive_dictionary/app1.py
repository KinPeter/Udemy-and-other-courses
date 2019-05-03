import json
from difflib import get_close_matches

# get_close_matches function returns a list of the most similar words


def lookup_word(word):
	# not necessary? word = word.lower()  # to make the search non case-sensitive 
	if word.lower() in data:
		return data[word.lower()]

	elif word.title() in data:
	 	return data[word.title()]

	elif word.upper() in data:
		return data[word.upper()]

	elif len(get_close_matches(word, data.keys(), cutoff=0.8)) > 0 :
		closest_match = get_close_matches(word, data.keys(), cutoff=0.8)[0]
		print('\nDid you mean %s instead?' % closest_match)
		
		choice = input('Please enter "Y" if yes, and "N" for no: ')
		choice = choice.lower()
		
		if choice == 'y':
			return data[closest_match]
		elif choice == 'n':
			return 'Sorry, it seems the word does not exist'
		else :
			return 'Sorry, we did not understand your entry.'

	else:
		return 'The word doesn\'t exist, please double check it.'

data = json.load(open('data.json', 'r'))

word = input('Enter a word: ')

output = lookup_word(word)

n = 0

if type(output) == list:
	for item in output:
		n += 1
		print('\n' + str(n) + '.) ' + item)

else: 
	print('\n' + output)

print()

