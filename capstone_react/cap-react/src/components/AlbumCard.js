import React from 'react';
import { Link } from 'react-router-dom';

const AlbumCard = (props) => {
    const album = props.album;
    const journal = props.journal;

    return (
        <>
            <div className="card" style={{width: "18rem"}}>
                <div className="card-body">
                   <Link to={`/Album/${journal}/${album.album}`} ><h5 className="card-title">{album.title}</h5></Link>
                    <p className="card-text">{album.desc}</p>
                    <span>
                        <h6 className="card-subtitle mb-2 text-muted">Date Added: {album.date}</h6>
                        <h6 className="card-subtitle mb-2 text-muted">Number of Pics: {album.pics}</h6>
                    </span>
                </div>
            </div>
        </>
    )
}

export default AlbumCard