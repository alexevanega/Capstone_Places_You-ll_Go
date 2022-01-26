from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash

from capstone_api.models import User


auth = Blueprint('authenticate',__name__,template_folder='auth_templates')

from capstone_api.models import db

@auth.route('/API/login', methods=['POST'])
def logIn():
    data = request.json
    print(data)

    email = data['email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user is None or not check_password_hash(user.password, password):
        return jsonify({
            'status': 'error',
            'message': "Incorrect username or password"
        })
    return jsonify({
        'status': 'success',
        'message': f"Welcome back, {email}",
        "data": user.to_dict(),
        "token": user.apitoken

    })

@auth.route('/API/register', methods=["POST"])
def register():
    data = request.json
    print(data)

    email = data['email']
    password = data['password']
    confirm_pass = data['confirmPassword']
    first = data['first']
    last = data['last']

    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({
            'status': 'error',
            'message': "User with that email already exists"
        })

    if password == confirm_pass:
        new_user = User(first,last,email,password)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(
                {
                    'status': 'success',
                    'data': new_user.to_dict(),
                    'message': f'Account successfully created for {first}'
                }
            )
    return jsonify({'status': 'error', 'message': 'Passwords do not match'})
