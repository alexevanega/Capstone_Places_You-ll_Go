from operator import and_
from flask import Blueprint, jsonify, request, send_from_directory
from flask import current_app as app
from werkzeug.utils import secure_filename
from sqlalchemy import and_,desc
import shutil
import os

from capstone_api.models import db, Albums

pics = Blueprint('pics',__name__)

@pics.route('/API/pics/uploads', methods=['GET','POST'])
def Upload():
    pic = request.files['image']
    data = request.form
    user = data['user']
    album = data['album']
    journal = data['journal']
    picname = secure_filename(pic.filename)

    path = os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album)
    if not os.path.exists(path):
        os.makedirs(path)
    img = os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album,picname)
    pic.save(img)
    return jsonify({'status':'success','message':'Picture Uploaded'})

@pics.route('/API/pics/add_album', methods=['POST'])
def addAlbum():
    data = request.form
    user=data['user']
    journal=data['journal']
    pics = 0
    title = data['title']
    desc = data['desc']
    add_album = Albums(title,desc,pics,user,journal)
    db.session.add(add_album)
    db.session.commit()
    return jsonify({'status':'success','message':'Album Created'})

@pics.route('/API/pics/edit_album/<album>',methods=['GET','POST'])
def editAlbum(album):
    edit = Albums.query.filter_by(id=album).first()
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

@pics.route('/API/pics/delete_album/<user>/<journal>/<album_id>',methods=['GET','POST'])
def deleteAlbum(user,journal,album_id):
    album = Albums.query.filter_by(id=album_id).first()
    db.session.delete(album)
    db.session.commit()
    shutil.rmtree(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album_id))

    return jsonify({'status':'success', 'message':'Album Deleted'})

@pics.route('/API/pics/delete_photo/<user>/<journal>/<album>/<filename>',methods=['GET','POST'])
def deletePhoto(user,journal,album_id,filename):
    album = Albums.query.filter_by(id=album_id).first()
    pics = int(album.num_of_pics)-1
    album.id = album.id
    album.title = album.title
    album.desc = album.desc
    album.pics = pics
    album.date_created = album.date_created
    album.user = album.user
    album.journal = album.journal
    db.session.commit()
    os.remove(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album_id,filename))

    return jsonify({'status': 'success', 'message': 'Photo Deleted'})

@pics.route('/API/pics/get_album/<user>/<journal>/<album>/')
def getAlbum(user,journal,album):
    to_send = []
    al = Albums.query.filter_by(id=album).first()
    path = os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album)
    if os.path.exists(path):
        for file in os.listdir(path):
            to_send.append(file)

    return jsonify([al.to_dict(),to_send])

@pics.route('/API/pics/get_albums_user/<user>')
def getAlbumsByUser(user):
    albums = Albums.query.filter_by(user=user).all()
    return jsonify([album.to_dict() for album in albums])

@pics.route('/API/pics/get_pics/<user>/<journal>/<album>')
def getPics(user,journal,album):
    to_send = []
    path = os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album)
    if os.path.exists(path):
        for file in os.listdir(path):
            to_send.append(file)
    return jsonify(to_send)

@pics.route('/API/pics/get_individual_image/<user>/<journal>/<album>/<filename>')
def getIndividualImage(user,journal,album,filename):
    if os.path.exists(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album,filename)):
        return send_from_directory(os.path.join(app.config['UPLOAD_FOLDER'],user,journal,album),filename)
    else:
        return jsonify({'status': 'failed', 'message':'could not find pic'})
    