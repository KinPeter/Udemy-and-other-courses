import requests, pandas
from bs4 import BeautifulSoup

base_url = 'https://www.pythonhow.com/real-estate/rock-springs-wy/LCWYROCKSPRINGS/t=0&s='

data_list = []

# there are 3 pages so we'll add a number in the range to the base base url
# and we create the request inside the for loop to scrape through all pages
for page in range(0, 30, 10):
    r = requests.get(base_url + str(page) + '.html')
    c = r.content
    soup = BeautifulSoup(c, 'html.parser')
    all = soup.find_all('div', {'class', 'propertyRow'})

    for item in all:
        dic = {}
        # create separate dictionaries for each property with keys are price, address, etc,
        # and the values are texts what we get from the div tags in the html
        dic['Price'] = item.find_all('h4', {'class' : 'propPrice'})[0].text.strip()
        dic['Address'] = item.find_all('span', {'class' : 'propAddressCollapse'})[0].text
        dic['Locality'] = item.find_all('span', {'class' : 'propAddressCollapse'})[1].text

        try:
            dic['Beds'] = item.find('span', {'class' : 'infoBed'}).find('b').text
        except AttributeError:
            dic['Beds'] = None

        try:
            dic['Full Baths'] = item.find('span', {'class' : 'infoValueFullBath'}).find('b').text
        except AttributeError:
            dic['Full Baths'] = None

        try:
            dic['Half Baths'] = item.find('span', {'class' : 'infoValueHalfBath'}).find('b').text
        except AttributeError:
            dic['Half Baths'] = None

        try:
            dic['Area'] = item.find('span', {'class' : 'infoSqFt'}).find('b').text
        except AttributeError:
            dic['Area'] = None

        for column_group in item.find_all('div', {'class', 'columnGroup'}):
            for feature_group, feature_name in zip(column_group.find_all('span', {'class', 'featureGroup'}), column_group.find_all('span', {'class', 'featureName'})):
                if 'Lot Size' in feature_group.text :
                    dic['Lot Size'] = feature_name.text

        # after we went through one property, we append the whole dictionary to the data list
        data_list.append(dic)

# at the end we convert the data list into a pandas DataFrame
df = pandas.DataFrame(data_list)
df.to_csv('Output.csv')
