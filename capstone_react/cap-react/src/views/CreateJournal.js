import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import './CJ.css'

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
            .then((result) => { console.log('success', result); props.reRender(); setRedirect('/profile') });
    }

    return (
        redirect ? <Navigate to='/profile' /> :
            <div className='cj-main'>
                <div>
                    <h1 id='cj-header'>Create Journal</h1>
                </div>
                <div className='cj-container'>
                <div className='form-box d-flex flex-column align-items-center'>
                        
                            <fieldset className='d-flex flex-column m-2 p-2 col-8'>
                                <label id='cj-label'>What would you like to call this journal?</label>
                                <input className="cj-input form-control border border-dark col-10" id="title" name="title" onChange={e => setTitle(e.target.value)} placeholder="Journal Title" required="" type="text" />
                            </fieldset>
                            <input className="col-6 btn btn-primary border border-dark" onClick={(e) => { createJournal(e) }} id="submit" name="submit" type="submit" value="Submit" />

                </div>
                </div>
            </div>
    )

}

export default CreateJournal