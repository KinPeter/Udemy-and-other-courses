from pandas_datareader import data
import datetime
from bokeh.plotting import figure, show, output_file
from bokeh.embed import components
from bokeh.resources import CDN

# start and end date of the data query
start = datetime.datetime(2016,3,1)
end = datetime.datetime(2016,9,30)

# using DataReader to get Google stock info from Yahoo finance
df = data.DataReader(name='GOOG', data_source='yahoo', start=start, end=end)

# creating the figure object
p = figure(x_axis_type='datetime', width=1200, height=400, sizing_mode='scale_width')
p.title.text = 'Candlestick Chart'
p.grid.grid_line_alpha = 0.5


# segment glyph for High and Low prices
# parameters are X axis and Y axis for highest point, then X and Y axis for lowest point
p.segment(df.index, df.High, df.index, df.Low, color='black')


# creating a function that determine if close price is lower or higher than open price
def inc_dec(close, open):
    if close > open:
        value = 'Increase'
    elif close < open:
        value = 'Decrease'
    else:
        value = 'Equal'
    return value

# adding a Status column to the dataframe and using the function to check each day
df['Status'] = [inc_dec(close, open) for close, open in zip(df.Close, df.Open)]

# adding a column to get the middle value for the Y axis middle of the rectangle
df['Middle'] = (df.Open + df.Close) /2

# adding a column to get the height of the rectangle with absolute value of the difference
df['Height'] = abs(df.Close - df.Open)

# 12 hours in miliseconds for the width of the rectangle
hours12 = 12*60*60*1000

# creating the rectangles by differentiating according to the stock price 'Increased' or 'Decreased'
# parameters in rect() are X axis, Y axis, width, height, then colors...
p.rect(df.index[df.Status=='Increase'], df.Middle[df.Status=='Increase'], hours12,
       df.Height[df.Status=='Increase'], fill_color='#CCFFFF', line_color='black')

p.rect(df.index[df.Status=='Decrease'], df.Middle[df.Status=='Decrease'], hours12,
       df.Height[df.Status=='Decrease'], fill_color='#FF3333', line_color='black')

# output_file('cs.html')
# show(p)

# components function gets the javascript and the html div from our figure
# object output to a tuple, which we can assign to variables
script1, div1 = components(p)

# CDN function imports the current JS and CSS links from CDN database
# both are lists with more links, we'll need [0] elements as they are the general links
cdn_js = CDN.js_files
cdn_css = CDN.css_files
