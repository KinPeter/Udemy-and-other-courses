from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return 'Homepage goes here'

@app.route('/about/')
def about():
    return 'Website content "about" goes here'

if __name__ == '__main__':
    app.run(debug=True)
