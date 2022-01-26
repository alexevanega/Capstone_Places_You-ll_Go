from operator import and_
from flask import Blueprint, jsonify, request
from sqlalchemy import asc, and_

from capstone_api.models import db,States,State_Attractions,Popular_Activities,visitedStates

states = Blueprint('states',__name__)

@states.route('/API/States')
def stateAPI():
    states = States.query.order_by(asc(States.state)).all()
    return jsonify([state.to_dict() for state in states])
    

@states.route('/API/States/<state>')
def grabStateAPI(state):
    grabbed = States.query.filter_by(state=state).first()
    return jsonify([grabbed.to_dict()])

@states.route('/API/States/attractions/<state>')
def AttAPI(state):
    attns = State_Attractions.query.filter_by(state_name=state).all()
    return jsonify([attn.to_dict() for attn in attns])

@states.route('/API/States/reasons/<state>')
def ReasonsAPI(state):
    reasons=Popular_Activities.query.filter_by(state_name=state).all()
    return jsonify([r.to_dict() for r in reasons])

@states.route('/API/States/addvisited', methods=['POST'])
def AddVisited():
    data = request.json
    print(data)

    state = data['state']
    user = data['user']

    add = visitedStates(state,user)
    db.session.add(add)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'visited state added!'})

@states.route('/API/States/remove_visited', methods=['POST'])
def RemoveVisited():
    data = request.json
    print(data)

    state = data['state']
    user = data['user']

    remove = visitedStates.query.filter(and_(state_name=state,user=user))
    db.session.delete(remove)
    db.session.commit()

@states.route('/API/States/get_visited_states/<user>')
def GrabVisitedStates(user):
    grab = visitedStates.query.filter_by(user=user).all()
    return jsonify([state.to_dict() for state in grab])

