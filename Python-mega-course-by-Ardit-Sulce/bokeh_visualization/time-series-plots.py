import pandas
from bokeh.plotting import figure
from bokeh.io import output_file, show


df = pandas.read_csv('adbe.csv', parse_dates=['Date'])

p = figure(width=500, height=500, x_axis_type='datetime', sizing_mode='stretch_both')

p.line(df['Date'], df['Close'], color='Orange', alpha=0.5)

output_file('timeseries.html')
show(p)
