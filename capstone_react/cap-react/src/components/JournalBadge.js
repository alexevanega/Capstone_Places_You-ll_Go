import React from 'react';
import { Link } from 'react-router-dom';
import AlbumItem from './AlbumItem';
import EntryItem from './EntryItem';

const JournalBadge = (props) => {
    const journal = props.journal


    const loopThroughAlbums = (albumlist) => {
        return albumlist.map(album => <AlbumItem key={album.album} deleteJournal={props.deleteJournal} album={album} />)
    }

    const loopThroughEntries = (entrylist) => {
        return entrylist.map(entry => <EntryItem key={entry.id} entry={entry} />)
    }


        return (
            <>
                <div>
                    <Link to={`/journal/${journal.id}`}><h1>{journal.title}</h1>
                    </Link>
                    <h5>{journal.entries.length}, {journal.date}</h5>
                    <button onClick={(e)=>{props.deleteJournal(e,journal.id)}} className='btn btn-link'>Delete Journal</button>
                </div>
                <div>
                    <ul>
                        {loopThroughEntries(journal.entries)}
                    </ul>
                </div>
                <div>
                    <ul>
                        {loopThroughAlbums(journal.albums)}
                    </ul>
                </div>
            </>
        )
}

export default JournalBadge