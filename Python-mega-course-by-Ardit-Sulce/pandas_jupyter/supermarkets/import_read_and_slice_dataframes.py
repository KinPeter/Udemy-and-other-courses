import os
os.listdir()

import pandas

# import csv file
df1 = pandas.read_csv("supermarkets.csv") # header = None : will not treat first row as header
print(df1.set_index("ID")) # will treat ID column as index but only for output, not saving it
print(df1.shape) # how many rows and colums we have?


# import json file
df2 = pandas.read_json("supermarkets.json")
print(df2)


# import excel file
df3 = pandas.read_excel("supermarkets.xlsx", sheet_name=0)  # sheet's index, so 0, 1, 2, etc
print(df3)


# import txt file, data separated by commas
df4 = pandas.read_csv("supermarkets-commas.txt")  # for txt with separated by commas just simply use read_csv
print(df4)


# import txt file, data separated by other character
df5 = pandas.read_csv("supermarkets-semi-colons.txt", sep=";")  # for txt with other separator use read_csv and add sep="" 
print(df5)


# import online files
df6 = pandas.read_csv("http://pythonhow.com/supermarkets.csv")  # to open online file
print(df6)


# changing the layout with index, and save:
df7 = df6.set_index("Address")   # save table with index "address" to a new variable
print(df7)


# label based indexing:
print(
	df7.loc["735 Dolores St" : "3995 23rd St", "City" : "Country"] # slice of table with range of rows and range of columns
	)  

# getting a single cell:
print(
	df7.loc["332 Hill St", "Name"]
	)

# getting 1 row to a list:
print(
	list(df7.loc["551 Alvarado St", : ])  # excludes the index cell!
	)


# position based indexing:
print(
	df7.iloc[1:4, 1:4]   # range here is upperbound exclusive!
	)

# getting a single cell:
print(
	df7.iloc[2, 4]   # range excludes the index cell!
	)

# getting 1 row to a list:
print(
	list(df7.iloc[5, : ])  # excludes the index cell!
	)

# combined indexing (Deprecated):
print(
	df7.ix[2, "Name"]   # can combine position and label, also can use range similarily as .loc and .iloc
	)