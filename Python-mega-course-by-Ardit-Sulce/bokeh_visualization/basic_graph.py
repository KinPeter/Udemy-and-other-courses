# making a basic bokeh line graph

from bokeh.plotting import figure
from bokeh.io import output_file, show
import pandas

# ---- from python lists
# prepare some data
x = [1,2,3,4,5]
y = [6,7,8,9,10]  # need to be the same length

# prepare the output file
output_file('line.html')

# create a figure object
f1 = figure()

# create line plot
f1.line(x, y)

# show the figure object
show(f1)



# ---- from local csv file
df = pandas.read_csv('data.csv')
x = df['x']  # index is the column name
y = df['y']

output_file('line_from_csv.html')
f2 = figure()
f2.line(x, y)
show(f2)



# ---- from local online csv file
df2 = pandas.read_csv('http://pythonhow.com/data/bachelors.csv')
x = df2['Year']
y = df2['Engineering']

output_file('line_from_web_csv.html')
f3 = figure()
f3.line(x, y)
show(f3)
