import os
os.listdir()

import pandas

from geopy.geocoders import ArcGIS

# creating a nominatim (arcGIS) object
nom = ArcGIS()

# getting a location to a variable
myloc = nom.geocode("Szekely bertalan utca 24, 1062, Budapest")
print(myloc)
print(myloc.latitude, myloc.longitude)
print(type(myloc))
print("\n\n")

# import csv file
df = pandas.read_csv("supermarkets.csv") 
print(df)
print("\n\n")

# create/modify a column with the complete address, separated by commas, for geopy.geocode method
df["Address"] = df["Address"] + ", " + df["City"] + ", " + df["State"] + ", " + df["Country"]
print(df)
print("\n\n")

# creating a new column for the location data we get with geopy
df["Coordinates"] = df["Address"].apply(nom.geocode)  # .apply will automatically pass the "Address" cell of each column
print(df)
print("\n\n")

# check if there is latitude data in first row
print(
	df.Coordinates[0].latitude
	)
print("\n\n")

# create new columns for latitude and longitude data only - from the existing coords column
df["Latitude"] = df["Coordinates"].apply(lambda x: x.latitude if x != None else None)
df["Longitude"] = df["Coordinates"].apply(lambda x: x.longitude if x != None else None)
# lambda x: to store each data in a temporary variable, so we can use .latitude and .longitude method on it
# "if" conditional for only do it if coordinate is not None, otherwise it throws error
print(df)
print("\n\n")






