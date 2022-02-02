import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { withParams } from "../hoc";

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
            .then((result) => { console.log('success', result);props.reRender();setRedirect(true) });
    }
    return (
        redirect ? <Navigate to={`/journal/${props.params.journal}`} />:
        <>
            <form onSubmit={(e)=>{AddEntry(e)}}>
                <div className="mb-3">
                    <label className="form-label">Entry Title</label>
                    <input type="text" className="form-control" onChange={(e)=>{handleTitle(e)}} id="exampleFormControlInput1" placeholder="Add Entry Title..." />
                </div>
                <div className="mb-3">
                    <label className="form-label">Journal Entry</label>
                    <textarea className="form-control" onChange={(e)=>{handleEntry(e)}} id="exampleFormControlTextarea1" rows="8"></textarea>
                </div>
                <input className="btn btn-primary" id="submit" name="submit" type="submit" value="Submit" />
            </form>
        </>
    )
}
export default withParams(AddEntry);