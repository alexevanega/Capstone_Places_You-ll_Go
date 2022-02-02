from flask_login.mixins import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from secrets import token_hex
from datetime import datetime

from capstone_api.forms import statesForm


db = SQLAlchemy()

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(150),nullable=False)
    last_name = db.Column(db.String(150),nullable=False)
    email = db.Column(db.String(150),nullable=False, unique=True)
    password = db.Column(db.String(256),nullable=False)
    date_added = db.Column(db.DateTime, nullable=True, default=datetime.utcnow())
    apitoken = db.Column(db.String,default=None, nullable=True)
    journals = db.relationship('Journal')
    albums = db.relationship('Albums')
    visited = db.relationship('visitedStates')

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
            'token': self.apitoken,
            'journals': [journal.to_dict() for journal in self.journals],
            'albums': [album.to_dict() for album in self.albums],
            'visited': [state.to_dict() for state in self.visited]
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
    attractions = db.relationship('State_Attractions')
    reasons = db.relationship('Popular_Activities')

 
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
            'season': self.season,
            'attractions': [att.to_dict() for att in self.attractions],
            'reasons': [rsn.to_dict() for rsn in self.reasons]
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
    state_name = db.Column(db.String(25),nullable=False)
    user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)

    def __init__(self,state,user):
        self.state_name = state
        self.user = user

    def to_dict(self):
        return {
            'state': self.state_name
        }

class Journal(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.Text,nullable=False)
    num_of_entries = db.Column(db.Text, default='0')
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    albums = db.relationship('Albums')
    entries = db.relationship('journalEntries')


    def __init__(self,title,user):
        self.title = title
        self.user = user

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'date': self.date_added,
            'albums': [album.to_dict() for album in self.albums],
            'entries': [entry.to_dict() for entry in self.entries]
        }

class journalEntries(db.Model):
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    entry = db.Column(db.Text,nullable=False)
    date_added = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    journal = db.Column(db.Integer, db.ForeignKey('journal.id'),nullable=False)

    def __init__(self,title,entry,journal):
        self.title = title
        self.entry = entry
        self.journal = journal

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'entry': self.entry,
            'date': self.date_added,
            'journal': self.journal
        }


class Albums(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.Text)
    desc = db.Column(db.Text)
    num_of_pics = db.Column(db.Text)
    date_created = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    user = db.Column(db.Integer, db.ForeignKey('user.id'),nullable=False)
    journal = db.Column(db.Integer,db.ForeignKey('journal.id'),nullable=False)
    
    def __init__(self,title,desc,pics,user,journal):
        self.title = title
        self.desc = desc
        self.num_of_pics = pics
        self.user = user
        self.journal = journal

    def to_dict(self):
        return {
            'album': self.id,
            'title': self.title,
            'desc': self.desc,
            'pics': self.num_of_pics,
            'date': self.date_created,
            'user': self.user,
            'journal': self.journal
        }
        

