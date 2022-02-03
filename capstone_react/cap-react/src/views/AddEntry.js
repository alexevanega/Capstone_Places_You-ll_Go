import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { withParams } from "../hoc";
import '../css/addEntry.css'

const AddEntry = (props) => {

    const [title, setTitle] = useState('');
    const [entry, setEntry] = useState('');
    const [redirect, setRedirect] = useState(null)

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleEntry = (event) => {
        setEntry(event.target.value)
    }

    const AddEntry = async (event) => {
        event.preventDefault();
        const journal = props.params.journal;
        const entryForm = new FormData();
        entryForm.set('title', title);
        entryForm.set('entry', entry);
        entryForm.set('journal', journal);

        fetch(`http://127.0.0.1:5000/API/journals/add_entry`,
            {
                method: 'POST',
                body: entryForm
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('success', result); props.reRender(); setRedirect(true) });
    }
    return (
        redirect ? <Navigate to={`/journal/${props.params.journal}`} /> :
            <div className="addentry-main">
                <h1>Add Entry</h1>
                <form className="addentry-forms-container" onSubmit={(e) => { AddEntry(e) }}>
                    <div className="addentry-forms">
                        <div className="mb-3">
                            <label className="form-label">Entry Title</label>
                            <input type="text" className="form-control" onChange={(e) => { handleTitle(e) }} id="exampleFormControlInput1" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Journal Entry</label>
                            <textarea className="form-control" onChange={(e) => { handleEntry(e) }} id="exampleFormControlTextarea1" rows="8"></textarea>
                        </div>
                    </div>
                    <input className="btn btn-primary" id="submit" name="submit" type="submit" value="Submit" />
                </form>
            </div>
    )
}
export default withParams(AddEntry);