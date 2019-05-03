import os
os.listdir()

import pandas

# import csv file
df6 = pandas.read_csv("supermarkets.csv") 
df7 = df6.set_index("Address")   # save table with index "address" to a new variable
print(df7)


# adding a new column: "Continent" and add same value to all rows
# this is an IMPLACE method, so it will update and save the dataframe
df7["Continent"] = df7.shape[0] * ["North America"]  # 0th element of shape tuple is the number of rows, so we multiply
print(df7)


# adding a new row
# first need to transpose the dataframe (change rows to columns and v.v.) to a new variable
# then actually add a new column with the previous method
# and then transpose it back to original form
df7_transp = df7.T
print(df7_transp)

df7_transp["My Address"] = [7, "My City", "My State", "My Country", "My Shopname", 17, "My Continent"]
df7 = df7_transp.T
print(df7)

# it is actually the same way to modify data in an existing row
# for that we have to pass the ID of the row here: df7_transp["My Address"] = blablabla