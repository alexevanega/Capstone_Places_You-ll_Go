import React from 'react';
import { Link } from 'react-router-dom';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/entryCard.css'

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
            <div className="entry-main card-body col-11">
                <div className='entry-header'>
                    <h4 className="card-title">{entry.title}</h4>
                    <h6 className="card-subtitle mb-2 text-muted">Date Entered: {entry.date}</h6>
                </div>
                <div className='entry-body'>
                    <p className="card-text">{entry.entry}</p>
                </div>
                <div className='entry-buttons'>
                    <Link style={{ color: 'black' }} to={`/EditEntry/${entry.id}`}>
                        <div>
                            <FontAwesomeIcon icon={faEdit} />
                            <button className="delete-journal">Edit Entry</button>
                        </div>
                    </Link>
                    <button onClick={(e) => { deleteEntry(e) }} className="delete-journal">
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </div>
            </div>
        </>
    )
}

export default EntryCard
