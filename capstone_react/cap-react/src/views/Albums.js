import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';

export default class Albums extends Component {

  loopThroughAlbums = (listofalbums) => { listofalbums.map(album => <AlbumCard key={album.name} album={album} /> ) }

  render() {
    return (
      <>
      <div className='d-flex justify-content-evenly'>
        {this.loopThroughAlbums(this.props.albums)}
      </div>
      </>
    )
  }
}
