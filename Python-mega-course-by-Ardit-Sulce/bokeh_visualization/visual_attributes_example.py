import pandas
from bokeh.plotting import figure
from bokeh.io import output_file, show

p = figure(plot_width=500, plot_height=400, tools = 'pan, reset')

p.title.text = "Earthquakes"
p.title.text_color = "Orange"
p.title.text_font = "times"
p.title.text_font_style = "italic"

p.yaxis.minor_tick_line_color = "Yellow"

p.xaxis.axis_label = "Times"
p.yaxis.axis_label = "Value"

p.circle([1,2,3,4,5], [5,6,5,5,3], size = [i*2 for i in [8,12,14,15,20]], color="red", alpha=0.5)

output_file("visuals_example.html")
show(p)
