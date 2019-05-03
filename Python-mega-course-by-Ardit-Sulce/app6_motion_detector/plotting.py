from motion_detector2 import df
from bokeh.plotting import figure, show, output_file
from bokeh.models import HoverTool, ColumnDataSource

# converting the dates into pandas datetime strings
# because HoverTool can only display strings in right format
df['Start_string'] = df['Start'].dt.strftime('%Y-%m-%d %H:%M:%S')
df['End_string'] = df['End'].dt.strftime('%Y-%m-%d %H:%M:%S')

# fetching the data to a ColumnDataSource object that we can use in the HoverTool
cds = ColumnDataSource(df)

# creating the plot object
p = figure(x_axis_type='datetime', height=300, width=1500, title='Motion graph')

# making the graph cleaner by removing unnecessary lines
p.yaxis.minor_tick_line_color = None
p.ygrid[0].ticker.desired_num_ticks = 1

# hover tool
hover = HoverTool(tooltips=[('Start', '@Start_string'), ('End', '@End_string')])
p.add_tools(hover)

# using Quad glyph to better show time frames as rectangles
q = p.quad(source=cds, left='Start', right='End', top=1, bottom=0, color='green')

output_file('graph.html')
show(p)
