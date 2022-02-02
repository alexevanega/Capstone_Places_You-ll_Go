import React from 'react';
import { Link } from 'react-router-dom';

const EntryCard = (props) => {
    const entry = props.entry;

    const deleteEntry = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://127.0.0.1:5000/API/journals/delete_entry/${entry.id}`);
        const data = await res.json();
        console.log(data);
        props.reRender();
    }

        return (
            <>
                <div className="card" style={{width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{entry.title}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{entry.date}</h6>
                        <p className="card-text">{entry.entry}</p>
                        <Link to={`/EditEntry/${entry.id}`}><button className="btn btn-link">Edit Entry</button></Link>
                        <button onClick={(e) => {deleteEntry(e)}} className="btn btn-link">Delete Entry</button>
                    </div>
                </div>
            </>
        )
}

export default EntryCard
