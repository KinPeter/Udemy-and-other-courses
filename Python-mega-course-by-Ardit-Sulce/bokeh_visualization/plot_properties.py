import pandas
from bokeh.plotting import figure
from bokeh.io import output_file, show

p = figure(plot_width=500, plot_height=300, tools='pan')

p.title.text='This is some cool data'
p.title.text_color='Gray'
p.title.text_font='Times'
p.title.text_font_style='bold'

p.xaxis.minor_tick_line_color=None
p.yaxis.minor_tick_line_color=None

p.xaxis.axis_label='Date'
p.yaxis.axis_label='Intensity'

p.line([1,2,3], [4,5,6])
output_file('graph.html')
show(p)
