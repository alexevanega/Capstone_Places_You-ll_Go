from enum import Flag
from re import S
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField


class statesForm(FlaskForm):
    state = StringField('state')
    state_abbr = StringField('state abbr')
    nickname = StringField('nickname')
    flag = StringField('flag image')
    capital = StringField('capital')
    population = StringField('population')
    timezone = StringField('timezone')
    largest_city = StringField('largest city')
    season = StringField('season')
    submit = SubmitField()

class updateForm(FlaskForm):
    state = StringField('state')
    state_abbr = StringField('state abbr')
    nickname = StringField('nickname')
    flag = StringField('flag image')
    capital = StringField('capital')
    population = StringField('population')
    timezone = StringField('timezone')
    largest_city = StringField('largest city')
    season = StringField('season')
    submit = SubmitField()

class deleteForm(FlaskForm):
    state = StringField('state')
    attn = StringField('attn')
    submit = SubmitField()

class stateAttrForm(FlaskForm):
    state = StringField('state')
    attr = StringField('attr')
    att_loc = StringField('att_loc')
    submit = SubmitField()

class activitesForm(FlaskForm):
    state = StringField('state')
    activity = StringField('activity')
    submit = SubmitField()

