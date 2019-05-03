import os
os.listdir()

import pandas

# import csv file
df6 = pandas.read_csv("supermarkets.csv") 
df7 = df6.set_index("Address")   # save table with index "address" to a new variable
print(df7)


# label based deleting - rows
print(
	df7.drop("3995 23rd St", 0)   # 0 means a row // not saving, delete only for output
	)


# label based deleting - colums
print(
	df7.drop("City", 1)   # 1 means a column // not saving, delete only for output
	)

# index based deleting - rows
print(
	df7.drop(df7.index[0:3], 0)
	)

# index based deleting - columns
print(
	df7.drop(df7.columns[0:3], 1)
	)

