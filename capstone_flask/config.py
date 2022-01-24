import os
from os.path import join,dirname,realpath

class Config():
    FLASK_APP = os.environ.get('FLASK_APP')
    FLASK_ENV = os.environ.get('FLASK_ENV')
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ALLOWED_EXTENSIONS = ['jpg','png','mov','mp4','mpg']
    MAX_CONTENT_LENGTH = 1000 * 1024 * 1024 #1000mb
    UPLOAD_FOLDER = join(dirname(realpath(__file__)), "capstone_api",'static','uploads')
