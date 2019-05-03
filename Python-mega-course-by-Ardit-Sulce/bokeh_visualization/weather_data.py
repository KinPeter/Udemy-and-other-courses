import pandas
from bokeh.plotting import figure
from bokeh.io import output_file, show

p = figure(plot_width=800, plot_height=600, tools='pan')

df = pandas.read_excel('http://pythonhow.com/data/verlegenhuken.xlsx')
x = df['Temperature'] / 10
y = df['Pressure'] / 10

p.title.text='Temperature and Air Pressure'
p.title.text_color='Gray'
p.title.text_font='Arial'
p.title.text_font_style='bold'

p.xaxis.minor_tick_line_color=None
p.yaxis.minor_tick_line_color=None

p.xaxis.axis_label='Temperature (C)'
p.yaxis.axis_label='Pressure (hPa)'

p.circle(x, y, size=0.5)
output_file('temp_and_press.html')
show(p)
