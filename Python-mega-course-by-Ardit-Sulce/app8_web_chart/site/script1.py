from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html') # html files must be in a folder "templates"


@app.route('/plot/')
def plot():
    from pandas_datareader import data
    import datetime
    from bokeh.plotting import figure, show, output_file
    from bokeh.embed import components
    from bokeh.resources import CDN

    start = datetime.datetime(2016,3,1)
    end = datetime.datetime(2016,9,30)
    df = data.DataReader(name='GOOG', data_source='yahoo', start=start, end=end)

    p = figure(x_axis_type='datetime', width=1200, height=400, sizing_mode='scale_width')
    p.title.text = 'Candlestick Chart'
    p.grid.grid_line_alpha = 0.5

    p.segment(df.index, df.High, df.index, df.Low, color='black')

    def inc_dec(close, open):
        if close > open:
            value = 'Increase'
        elif close < open:
            value = 'Decrease'
        else:
            value = 'Equal'
        return value

    df['Status'] = [inc_dec(close, open) for close, open in zip(df.Close, df.Open)]
    df['Middle'] = (df.Open + df.Close) /2
    df['Height'] = abs(df.Close - df.Open)
    hours12 = 12*60*60*1000

    p.rect(df.index[df.Status=='Increase'], df.Middle[df.Status=='Increase'], hours12,
           df.Height[df.Status=='Increase'], fill_color='#CCFFFF', line_color='black')

    p.rect(df.index[df.Status=='Decrease'], df.Middle[df.Status=='Decrease'], hours12,
           df.Height[df.Status=='Decrease'], fill_color='#FF3333', line_color='black')

    script1, div1 = components(p)

    cdn_js = CDN.js_files[0]
    cdn_css = CDN.css_files[0]

    return render_template('plot.html', script1=script1, div1=div1, cdn_js=cdn_js, cdn_css=cdn_css)

if __name__ == '__main__':
    app.run(debug=True)
