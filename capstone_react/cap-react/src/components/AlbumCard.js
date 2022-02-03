import React from 'react';
import { Link } from 'react-router-dom';
import '../css/albumCard.css'

const AlbumCard = (props) => {
    const album = props.album;
    const journal = props.journal;

    return (
        <>
            <div className="album-card card" style={{width: "10rem"}}>
                <div className="album-body card-body">
                   <Link style={{color:'black'}} to={`/Album/${journal}/${album.album}`} ><h5 className="card-title">{album.title}</h5></Link>
                    <p className="card-text"><small>{album.desc}</small></p>
                    <span>
                        <p className="album-date card-subtitle mb-2 text-muted"><small>Date Added: {album.date}</small></p>
                    </span>
                </div>
            </div>
        </>
    )
}

export default AlbumCard