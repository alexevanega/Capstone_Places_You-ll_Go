import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const CreateJournal = (props) => {
    const [title, setTitle] = useState('')
    const [redirect, setRedirect] = useState(null)

    const createJournal = async (event) => {
        event.preventDefault();
        const journal = new FormData();
        journal.set('title', title);
        journal.set('user', props.user.id);

        fetch('http://127.0.0.1:5000/API/journals/create_journal',
            {
                method: 'POST',
                body: journal
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('success', result);props.reRender(); setRedirect('/profile') });
    }

        return (
            redirect ? <Navigate to='/profile' /> :
                <div>
                    <form onSubmit={(e) => { createJournal(e) }}>
                        <div className="form-group">
                            <fieldset>
                                <label>Title</label>
                                <input className="form-control" id="title" name="title" onChange={e => setTitle(e.target.value)} placeholder="Journal Title" required="" type="text" />
                            </fieldset>
                            <input className="btn btn-primary" id="submit" name="submit" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
        )
    
}

export default CreateJournal