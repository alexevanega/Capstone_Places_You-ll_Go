from re import template
from capstone_api import app
from flask import render_template


@app.route('/')
def homePage():
    return render_template('home.html', title='Car Collection Home Page')