from flask import Flask
from config import Config
from .auth.routes import auth
from .photos.routes import pics
from .states.routes import states
from .journals.routes import journal
from .models import db
from flask_migrate import Migrate
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth)
app.register_blueprint(pics)
app.register_blueprint(states)
app.register_blueprint(journal)

app.config.from_object(Config)

db.init_app(app)


migrate = Migrate(app,db)

from capstone_api import models
from capstone_api import routes
