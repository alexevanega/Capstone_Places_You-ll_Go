from flask_login.mixins import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from secrets import token_hex

from capstone_api.forms import statesForm


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
    state = db.Column(db.String(25), primary_key=True)
    state_abbr = db.Column(db.String(5))
    nickname = db.Column(db.String(150))
    flag = db.Column(db.String(300))
    capital = db.Column(db.String(150))
    population = db.Column(db.String)
    timezone = db.Column(db.String(25))
    largest_city = db.Column(db.String(150))
    season = db.Column(db.String(10))
    attractions = db.relationship('State_Attractions', backref='States')
    reasons = db.relationship('Popular_Activities', backref='States')

 
    def __init__(self,state,st_ab,nknm,flg,cap,pop,tmzn,lgcy,seasn):
        self.state = state
        self.state_abbr = st_ab
        self.nickname = nknm
        self.flag = flg
        self.capital = cap
        self.population = pop
        self.timezone = tmzn
        self.largest_city = lgcy
        self.season = seasn


    def to_dict(self):
        return {
            'name': self.state,
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
    state_name = db.Column(db.String(25),db.ForeignKey('states.state'),nullable=False)
    attraction = db.Column(db.String(200))
    att_loc = db.Column(db.String(50))

    

    def __init__(self,state_name,attraction,att_loc):
        self.state_name = state_name
        self.attraction = attraction
        self.att_loc = att_loc


    def to_dict(self):
        return {
        'att': self.attraction,
        'state': self.state_name,
        'loc': self.att_loc
        }
    
        
class Popular_Activities(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    state_name = db.Column(db.String(25),db.ForeignKey('states.state'),nullable=False)
    activity = db.Column(db.String(300))

 

    def __init__(self,state,activity):
        self.state_name = state
        self.activity = activity

    def to_dict(self):
        return {
            'state': self.state_name,
            'reason': self.activity
        }


class visitedStates(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    state_name = db.Column(db.String(25),db.ForeignKey('states.state'),nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

    def to_dict(self):
        return {
            self.user: self.state_name
        }


