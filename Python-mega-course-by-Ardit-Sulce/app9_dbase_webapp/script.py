from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy
from sendemail import send_email_to
from sqlalchemy import func

app = Flask(__name__)

# CONNECTION TO SQL DATABASE
# the value should be username:password@localhost/databasename
# local: app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:postgres123@localhost/height_collector'
# heroku link:  --> NEED to add '?sslmode=require' to the end of the link!!!
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgres://yzdvpulfluorlb:edac3d6f1fca2673fc9c5f5de949579b53507620a5c7830b2d05280100369107@ec2-54-197-234-33.compute-1.amazonaws.com:5432/deebn2trdi260i?sslmode=require'
# with SQLAlchemy we create a db object for the app 'App'
db = SQLAlchemy(app)

class Data(db.Model):
    """ This class is to create a table in our database """
    __tablename__ = 'data'
    id = db.Column(db.Integer, primary_key=True)
    email_ = db.Column(db.String(120), unique=True)
    height_ = db.Column(db.Integer)

    def __init__(self, email_, height_):
        self.email_ = email_
        self.height_ = height_
    # we don't initiate this class in the script yet, as we don't want it to run and create table each time
    # so we can run it outside of the script in python shell, by importing the db object and then run create_all method
    # >>> from script import db
    # >>> db.create_all()


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/success', methods=['POST']) # must specify POST method, that means it's used by the html 'form'
def success():
    if request.method == 'POST':  # this part runs only if the method is POST, so not when someone just visits the /success url directly
        email = request.form['email_name']
        height = request.form['height_name']

        # this condition checks all e-mails in the database email column and only sends the new email to the database
        # if it's not added yet
        if db.session.query(Data).filter(Data.email_ == email).count() == 0:
            # creating a data object for our Data class (which access the database) and and sending our new data to it
            data = Data(email, height)
            db.session.add(data)
            db.session.commit()

            average_height = db.session.query(func.avg(Data.height_)).scalar()  # gets the avg height from the database as an sql query
            average_height = round(average_height, 1)

            count = db.session.query(Data.height_).count()

            send_email_to(email, height, average_height, count)

            return render_template('success.html')

        # if the email is existing in the database, we stay on index page and add a message to the user:
        return render_template('index.html', text='Seems like we already got your e-mail address')

if __name__ == '__main__':
    app.debug=True
    app.run()
