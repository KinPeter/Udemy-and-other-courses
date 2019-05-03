import folium, pandas


def color_producer(elev):
    if elev < 2000 :
        return 'green'
    elif 2000 <= elev < 3000 :
        return 'orange'
    else :
        return 'red'


data = pandas.read_csv("Volcanoes.txt")
# putting the columns of the table into different variables to get python native lists
lat = list(data['LAT'])
lon = list(data['LON'])
vol_name = list(data['NAME'])
elev = list(data['ELEV'])

# creating a map object with a base map tile and starting location
map = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles='Mapbox Bright')

# creating the first FeatureGroup for Volcanoes
fg_vol = folium.FeatureGroup(name='Volcanoes')

for lt, ln, nm, el in zip(lat, lon, vol_name, elev) : # zip function lets us iterate through 2 lists at the same time
    fg_vol.add_child(folium.CircleMarker(location=[lt, ln], popup=nm+': '+str(el)+' m',
    radius=6, fill_color=color_producer(el), color='grey', fill_opacity=0.7))


# creating the second FeatureGroup for population
fg_pop = folium.FeatureGroup(name='Population')
# adding a polygon layer from world.json
world_data = open('world.json', 'r', encoding='utf-8-sig')

fg_pop.add_child(folium.GeoJson(data=world_data.read(),
style_function=lambda x: {'fillColor':'green' if x['properties']['POP2005'] < 10000000
else 'orange' if 10000000 <= x['properties']['POP2005'] < 20000000 else 'red' }))
# style_function will give the fillColor of the polygons according to the population of each country
# use lambda function to add a "nested" function with conditionals to check population property of the countries
# and determine their color according to the number


# here we actually add both FeatureGroups (fg) to the map
map.add_child(fg_vol)
map.add_child(fg_pop)

map.add_child(folium.LayerControl())

map.save('map_volcanoes.html')
