import React, { Component } from 'react';

export default class AlbumItem extends Component {
  render() {
    const album = this.props.album
    return (<li>{album.title}, {album.date}</li>)
  }
}
