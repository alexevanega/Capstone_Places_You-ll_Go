from flask.helpers import url_for
from werkzeug.utils import redirect
from capstone_api import app
from flask import render_template, request
from sqlalchemy import asc

from capstone_api import db

from capstone_api.forms import activitesForm, deleteForm, stateAttrForm, statesForm, updateForm
from capstone_api.models import Popular_Activities, State_Attractions, States


@app.route('/')
def homePage():
    return render_template('home.html', title='Car Collection Home Page')

@app.route('/AddToDB', methods= ['GET','POST'])
def addToDB():
    add_form = statesForm()
    if request.method == 'POST':
        if add_form.validate():
            state = add_form.state.data
            state_abbr = add_form.state_abbr.data
            nickname = add_form.nickname.data
            flag = add_form.flag.data
            capital = add_form.capital.data
            population = add_form.population.data
            timezone = add_form.timezone.data
            season = add_form.season.data
            largest_city = add_form.largest_city.data

            state_info = States(state,state_abbr,nickname,flag,capital,population,timezone,largest_city,season)
            db.session.add(state_info)
            db.session.commit()

            return redirect(url_for('addToDB'))        
    return render_template('add_to_db.html', form=add_form)

@app.route('/AddAtt', methods= ['GET','POST'])
def addAtt():
    add_form = stateAttrForm()
    if request.method == 'POST':
        if add_form.validate():
            state = add_form.state.data
            state_att = add_form.attr.data
            att_loc = add_form.att_loc.data


            att_info = State_Attractions(state,state_att,att_loc)
            db.session.add(att_info)
            db.session.commit()

            return redirect(url_for('addAtt'))        
    return render_template('add_attctns.html', form=add_form)


@app.route('/API/States/List')
def grabStateInfo():
    state = States.query.order_by(asc(States.state)).all()
    return render_template('states_api.html',states=state)

@app.route('/API/update/<state>', methods=['GET','POST'])
def Update(state):
    update_form=updateForm()
    update = States.query.filter_by(state=state).first()
    if request.method == 'POST':
        if update_form.validate():

            state = update_form.state.data
            state_abbr = update_form.state_abbr.data
            nickname = update_form.nickname.data
            flag = update_form.flag.data
            capital = update_form.capital.data
            population = update_form.population.data
            timezone = update_form.timezone.data
            season = update_form.season.data
            largest_city = update_form.largest_city.data

            if not state:
                state = update.state
            if not state_abbr:
                state_abbr = update.state_abbr
            if not nickname:
                nickname = update.nickname
            if not flag:
                flag = update.flag
            if not capital:
                capital = update.capital
            if not population:
                population = update.population
            if not timezone:
                timezone = update.timezone
            if not largest_city:
                largest_city = update.largest_city
            if not season:
                season = update.season
            
            update.state = state
            update.state_abbr = state_abbr
            update.nickname = nickname
            update.flag = flag
            update.capital = capital
            update.population = population
            update.timezone = timezone
            update.largest_city = largest_city
            update.season = season
            db.session.commit()

        return redirect(url_for('Update', state=state))
    return render_template('update.html', form=update_form)

@app.route('/deleteatt',methods=['GET','POST'])
def deleteAtt():
    delete_form = deleteForm()
    state = delete_form.state.data
    attraction = delete_form.attn.data
    att = State_Attractions.query.filter_by(state_name=state,attraction=attraction).first()

    if request.method == 'POST':
        if delete_form.validate():
            db.session.delete(att)
            db.session.commit()
            return redirect(url_for('deleteAtt'))

    return render_template('delete.html', form=delete_form)

@app.route('/addact', methods=['GET','POST'])
def addActivity():
    act_form = activitesForm()
    state = act_form.state.data
    act = act_form.activity.data

    if request.method == 'POST':
        if act_form.validate():
            act_info = Popular_Activities(state,act)
            db.session.add(act_info)
            db.session.commit()
            return redirect(url_for('addActivity'))
    return render_template('add_activity.html', form=act_form)

@app.route('/deleteact', methods=['GET','POST'])
def deleteActivity():
    act_form = activitesForm()
    state = act_form.state.data
    act = act_form.activity.data
    dele = Popular_Activities.query.filter_by(state_name=state,activity=act).first()

    if request.method == 'POST':
        if act_form.validate():
            db.session.delete(dele)
            db.session.commit()
            return redirect(url_for('deleteActivity'))
    return render_template('add_activity.html', form=act_form)


    
