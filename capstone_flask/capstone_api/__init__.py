from flask import Flask
from config import Config
from .auth.routes import auth
from .pics.routes import pics
from .models import db
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth)
app.register_blueprint(pics)

app.config.from_object(Config)

db.init_app(app)


migrate = Migrate(app,db)

from capstone_api import models
from capstone_api import routes
