from operator import and_
from flask import Blueprint, jsonify, request, send_from_directory
from flask import current_app as app
from itsdangerous import json
from werkzeug.utils import secure_filename
from sqlalchemy import and_
import shutil
import os

from capstone_api.models import db, Albums

pics = Blueprint('pics',__name__)

@pics.route('/API/pics/uploads', methods=['GET','POST'])
def upload():
    pic = request.files['image']
    data = request.form
    user = data['user']
    title = data['title']
    album = data['album']
    journal = data['journal']
    picname = secure_filename(pic.filename)

    chk = Albums.query.filter(and_(user=user,album=album,jouranl=journal)).first()
    if chk:
        pics = int(chk.num_of_pics)+1
        chk.id = chk.id
        chk.title = chk.title
        chk.desc = chk.desc
        chk.pics = pics
        chk.date_created = chk.date_created
        chk.user = chk.user
        chk.journal = chk.journal
        pic.save(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album,picname))

    else:
        os.makedirs(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album))
        pic.save(os.path.join(app.config['UPLOAD_FOLDER'],user,album,picname))
        pics = 1
        desc = data['desc']
        add_album = Albums(title,desc,pics,user,journal)
        db.session.add(add_album)

    db.session.commit()

    return {
        'message': 'I Got It'
    }

@pics.route('/API/pics/edit_album/<album>',methods=['GET','POST'])
def editAlbum(album):
    edit = Albums.query.filter_by(album=album).first()
    data = request.form
    title = data['title']
    desc = data['desc']

    if not title:
        title = edit.title
    if not desc:
        desc = edit.desc

    edit.id = edit.id
    edit.title = title
    edit.desc = desc
    edit.num_of_pics = edit.num_of_pics
    edit.date_created = edit.date_created
    edit.user = edit.user
    edit.journal = edit.journal
    db.session.commit()

    return jsonify({'status': 'success','message': 'Album Edited'})

@pics.route('/API/pics/delete_album/<user>/<journal>/<album>',methods=['GET','POST'])
def deleteAlbum(user,journal,album):
    album = Albums.query.filter_by(album=album).first()
    db.session.delete(album)
    db.session.commit()
    shutil.rmtree(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album))

    return jsonify({'status':'success', 'message':'Album Deleted'})

@pics.route('/API/pics/delete_photo/<user>/<journal>/<album>/<filename>',methods=['GET','POST'])
def deletePhoto(user,journal,album,filename):
    album = Albums.query.filter_by(album=album).first()
    pics = int(album.num_of_pics)-1
    album.id = album.id
    album.title = album.title
    album.desc = album.desc
    album.pics = pics
    album.date_created = album.date_created
    album.user = album.user
    album.journal = album.journal
    db.session.commit()
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album,filename))

    return jsonify({'status': 'success', 'message': 'Photo Deleted'})


@pics.route('/API/pics/get_albums/<user>/<journal>')
def getAlbums(user,journal):
    albums= Albums.query.filter(and_(user=user,journal=journal)).all()
    return jsonify([album.to_dict() for album in albums])

@pics.route('/API/pics/get_pics/<user>/<journal>/<album>')
def getPics(user,journal,album):
    to_send = []
    path = os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album)
    
    for file in os.listdir(path):
        to_send.append(file)
    return jsonify(to_send)

@pics.route('/API/pics/get_individual_image/<user>/<journal>/<album>/<filename>')
def getIndividualImage(user,journal,album,filename):
    return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album),filename)
    