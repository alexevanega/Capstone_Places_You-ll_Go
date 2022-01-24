from flask import Blueprint, jsonify, send_from_directory
from flask import current_app as app

import os

pics = Blueprint('pics',__name__)

@pics.route('/API/getpics/<user>/<album>')
def getPics(user,album):
    to_send = []
    path = os.path.join(app.config['UPLOAD_FOLDER'],user,album)
    
    for file in os.listdir(path):
        to_send.append(file)
    return jsonify(to_send)

@pics.route('/API/getalbums/<user>')
def getAlbums(user):
    to_send = []
    path = os.path.join(app.config['UPLOAD_FOLDER'],user)

    for folder in os.listdir(path):
        to_send.append(folder)
    return jsonify(to_send)

@pics.route('/API/getindividualimage/<user>/<album>/<filename>')
def getIndividualImage(user,album,filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'],user,album),filename)
    