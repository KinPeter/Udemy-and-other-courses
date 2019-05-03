from flask import Flask, render_template, request, send_file
from werkzeug import secure_filename
from geopy.geocoders import ArcGIS
import pandas, datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/table', methods=['POST'])
def table():
    global filename
    if request.method == 'POST':
        file = request.files['file']
        try:
            df = pandas.read_csv(file)
            geoc = ArcGIS()

            df['coords'] = df['Address'].apply(geoc.geocode)
            df['Latitude'] = df['coords'].apply(lambda x: x.latitude if x != None else None)
            df['Longitude'] = df['coords'].apply(lambda x: x.longitude if x != None else None)
            df = df.drop('coords', 1)

            filename = datetime.datetime.now().strftime('uploads/geocoded_%m-%d-%H-%M-%S'+'.csv')
            df.to_csv(filename, index=None)

            return render_template('index.html', text=df.to_html(), btn='download.html')
        except:
            return render_template('index.html', text="Please make sure you have the correct CSV file with an 'Address' column.")

@app.route('/download')
def download():
    return send_file(filename, attachment_filename='your_'+filename, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True)
