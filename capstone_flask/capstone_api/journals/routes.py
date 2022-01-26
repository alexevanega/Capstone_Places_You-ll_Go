from flask import Blueprint, jsonify, request
from flask import current_app as app
from sqlalchemy import desc, and_

import shutil
import os

from capstone_api.models import db, Journal, journalEntries, Albums

journal = Blueprint('journal',__name__)

@journal.route('/API/journals/<user>')
def grabJournals(user):
    journals = Journal.query.filter_by(user=user).order_by(desc(Journal.date_added)).all()
    return jsonify([journ.to_dict() for journ in journals])

@journal.route('/API/journals/grab_entries/<journal>')
def grabJournalEntries(journal):
    entries = journalEntries.query.filter_by(journal=journal).order_by(desc(journalEntries.date_added)).all()
    return jsonify([entry.to_dict() for entry in entries])

@journal.route('/API/journals/create_journal',methods=['POST'])
def createJournal():
    data = request.form
    title = data['title']
    user = data['user']

    add = Journal(title,user)
    db.session.add(add)
    db.session.commit()
    return jsonify({'status': 'success','message': 'Journal Created!'})

@journal.route('/API/journals/add_entry/<journal>',methods=['GET','POST'])
def addEntry(journal):
    data = request.form
    title = data['title']
    entry = data['entry']
    jrnl = Journal.query.filter_by(journal=journal).first()
    entries = int(jrnl.num_of_entries)+1

    jrnl.id = jrnl.id
    jrnl.title = jrnl.title
    jrnl.num_of_entries = entries
    jrnl.date_added = jrnl.date_added
    jrnl.user = jrnl.user

    add = journalEntries(title,entry,journal)
    db.session.add(add)
    db.session.commit()

    return jsonify({'status': 'success', 'message': 'Entry Added'})

@journal.route('/API/journals/edit_entry/<entry>',methods=['GET','POST'])
def editEntry(entry):
    data = request.form
    edit = journalEntries.query.filter_by(id=entry).first()
    title = data['title']
    entry = data['entry']
    
    edit.id = edit.id
    edit.date_added = edit.date_added
    edit.journal = edit.journal
    edit.title = title
    edit.entry = entry
    db.session.commit()
    
    return jsonify({'status': 'success', 'message': 'Entry Edited'})

@journal.route('/API/journals/edit_journal/<journal>',methods=['GET','POST'])
def editJournal(journal):
    data = request.form
    edit = Journal.query.filter_by(id=journal).first()
    title = data['title']
    
    edit.id = edit.id
    edit.date_added = edit.date_added
    edit.num_of_entries = edit.num_of_entries
    edit.title = title
    edit.user = edit.user
    db.session.commit()
    
    return jsonify({'status': 'success', 'message': 'Journal Edited'})

@journal.route('/API/journals/delete_entry/<entry>',methods=['GET','POST'])
def deleteEntry(entry):
    delete = journalEntries.query.filter_by(id=entry).first()
    dcrs = Journal.query.filter_by(id=delete.id).first()
    entries = int(dcrs.num_of_entries)-1
    
    dcrs.id = dcrs.id
    dcrs.title = dcrs.title
    dcrs.num_of_entries = entries
    dcrs.date_added = dcrs.date_added
    dcrs.user = dcrs.user
    db.session.delete(delete)
    db.session.commit()

    return jsonify({'status': 'success','message':'Entry Deleted'})

@journal.route('/API/journals/delete_journal/<journal>',methods=['GET','POST'])
def deleteJournal(journal):
    albums = Albums.query.filter_by(journal=journal).all()
    entries = journalEntries.query.filter_by(journal=journal).all()
    delete = Journal.query.filter_by(id=journal).first()

    for album in albums:
        db.session.delete(album)
    for entry in entries:
        db.session.delete(entry)

    shutil.rmtree(os.path.join(app.config['UPLOAD_FOLDER'],delete.user,journal))


    db.session.delete(delete)
    db.session.commit()

    return jsonify({'status': 'success','message':'Journal Deleted'})
