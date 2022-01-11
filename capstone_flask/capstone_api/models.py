from flask_login.mixins import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from secrets import token_hex


db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150),nullable=False)
    last_name = db.Column(db.String(150),nullable=False)
    email = db.Column(db.String(150),nullable=False, unique=True)
    password = db.Column(db.String(256),nullable=False)
    apitoken = db.Column(db.String,default=None, nullable=True)

    def __init__(self,first,last,email,password):
        self.first_name = first
        self.last_name = last
        self.email = email
        self.password = generate_password_hash(password)
        self.apitoken = token_hex(15)

    def to_dict(self):
        return {
            'id': self.id,
            'email':self.email,
            'first': self.first_name,
            'last': self.last_name,
            'token': self.apitoken
            }


class States(db.Model):
    state_name = db.Column(db.String(25), primary_key=True)
    state_abbr = db.Column(db.String(5))
    nickname = db.Column(db.String(150))
    flag = db.Column(db.String(300))
    capital = db.Column(db.String(150))
    population = db.Column(db.Integer)
    timezone = db.Column(db.String(25))
    largest_city = db.Column(db.String(150))
    season = db.Column(db.String(10))

    def to_dict(self):
        return {
            'name': self.state_name,
            'abbr': self.state_abbr,
            'nickname': self.nickname,
            'flag': self.flag,
            'capital': self.capital,
            'population': self.population,
            'timezone': self.timezone,
            'largest_city': self.largest_city,
            'season': self.season
        }


class State_Attractions(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state_name = db.Column(db.String(25))
    attraction = db.Column(db.String(200))
    att_type = db.Column(db.String(50))


class visitedStates(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    state = db.Column(db.String(25), db.ForeignKey('states.state_name'), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

    def to_dict(self):
        return {
            self.state: self.user
        }


