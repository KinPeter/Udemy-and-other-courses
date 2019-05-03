import folium

map = folium.Map(location=[38.58, -99.09], zoom_start=6, tiles='Mapbox Bright')

fg = folium.FeatureGroup(name='My Map')

coordinates = [[38.2, -99.1], [37.2, -98.1], [36.2, -97.1]]

for coord in coordinates:
    fg.add_child(folium.Marker(location=coord, popup='Hi, I am a marker', icon=folium.Icon(color='green')))

map.add_child(fg)

map.save('map1.html')
