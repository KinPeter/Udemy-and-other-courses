import requests
from bs4 import BeautifulSoup

r = requests.get('https://www.pythonhow.com/example.html')
c = r.content

soup = BeautifulSoup(c, 'html.parser')

# find all div's with class = cities, this will result a list
all = soup.find_all('div', {'class' : 'cities'})

# get only the first element of the list by adding an index
#all = soup.find_all('div', {'class' : 'cities'})[0]
#print(all)

# get the text of the H2 tag in the first div
get1 = all[0].find_all('h2')[0].text
#print(get1)

# iterate through the list and get each h2 and p tag texts
for item in all:
    print(item.find_all('h2')[0].text)
    print(item.find_all('p')[0].text)
