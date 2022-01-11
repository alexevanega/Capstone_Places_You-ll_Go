from capstone_api import app
from capstone_api.models import db, User

@app.shell_context_processor
def shell_context():
    return {'db': db, 'User': User }