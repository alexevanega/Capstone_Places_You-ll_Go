import React from 'react';
import { Link } from 'react-router-dom';
import AlbumItem from './AlbumItem';
import EntryItem from './EntryItem';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './journalBadge.css'

const JournalBadge = (props) => {
    const journal = props.journal


    const loopThroughAlbums = (albumlist) => {
        return albumlist.map(album => <AlbumItem key={album.album} deleteJournal={props.deleteJournal} album={album} />)
    }

    const loopThroughEntries = (entrylist) => {
        return entrylist.map(entry => <EntryItem key={entry.id} entry={entry} />)
    }


    return (
        <div className='journal-badge'>
            <div className='header-info'>
                <div className=' header-jp col-11 ps-4 me-auto'>
                    <Link style={{textDecoration: 'none'}} to={`/journal/${journal.id}`}><h1 className='journal-header'>{journal.title}</h1>
                    </Link>
                    <div className='journal-subline'> 
                    <h4>No. of Entries: {journal.entries.length}</h4>
                    <h4>Date Created: {journal.date}</h4>
                    </div>
                </div>
                <div className='button col-1'>
                    <button onClick={(e) => { props.deleteJournal(e, journal.id) }} className='delete-journal'>
                        <FontAwesomeIcon icon={faTrashAlt} size='1x' />
                    </button>
                </div>
            </div>
            <div className='journal-contents'>
                <div className='containers-jb-1 col-6'>
                    <div className='journal-entries col-12'>
                    {loopThroughEntries(journal.entries)}
                    </div>
                </div>
                <div className='containers-j2 col-6'>
                    <div className='journal-albums'>
                    {loopThroughAlbums(journal.albums)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default JournalBadge