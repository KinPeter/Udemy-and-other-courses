from flask import Flask, render_template, request, send_file
from werkzeug import secure_filename


app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/success', methods=['POST']) # must specify POST method, that means it's used by the html 'form'
def success():
    global file
    if request.method == 'POST':  # this part runs only if the method is POST, so not when someone just visits the /success url directly
        file = request.files['file']
        file.save(secure_filename('uploaded_'+file.filename))
        with open('uploaded_'+file.filename, 'a') as f:
            f.write('This line was added later')
        return render_template('index.html', btn='download.html')

@app.route('/download')
def download():
    return send_file('uploaded_'+file.filename, attachment_filename='your_file.csv', as_attachment=True)

if __name__ == '__main__':
    app.debug=True
    app.run()
