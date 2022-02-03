import React, { Component } from 'react';
import '../css/item.css'

export default class AlbumItem extends Component {
  render() {
    const album = this.props.album
    return (
      <div className='item d-flex flex-column align-items-center'>
        <h6 className='item-header'>{album.title}</h6>
        <p className='item-subline'>{album.date}</p>
      </div>
    )
  }
}
