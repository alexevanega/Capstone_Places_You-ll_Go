import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import Upload from '../components/Upload';
import Pic from '../components/Pic';
import { withParams } from '../hoc';
import './album.css'

class AlbumPage extends Component {

  constructor() {
    super();
    this.state = {
      album: null,
      pics: [],
      add: false,
      pic: null,
      trigger: false,
      redirect: false
    }
  }

  grabAlbum = async () => {
    const album = this.props.params.album;
    const journal = this.props.params.journal;
    const user = this.props.user.id;
    const res = await fetch(`http://127.0.0.1:5000/API/pics/get_album/${user}/${journal}/${album}/`);
    const data = await res.json();
    this.setState({ album: data[0], pics: data[1] })
  }

  componentDidMount() {
    this.grabAlbum()
  }
  componentDidUpdate() {
    if (this.state.trigger !== false) {
      this.grabAlbum();
      this.setState({ trigger: false });
    }
  }

  reRender = () => {
    this.setState({ trigger: true, add: false })
  }

  loopThroughPics = (listofpics) => {
    return listofpics.map(pic => <Pic key={pic} pic={pic} user={this.props.user} album={this.props.params.album} journal={this.props.params.journal} showPic={this.showPic} />)
  }

  showPic = (e, pic) => {
    e.preventDefault();
    this.setState({ pic: pic })
  }

  addToAlbum = (e) => {
    e.preventDefault();
    this.setState({ add: true })
  }

  deleteAlbum = async (e) => {
    e.preventDefault();
    const album = this.props.params.album;
    const journal = this.props.params.journal;
    const user = this.props.user.id;
    const res = await fetch(`http://127.0.0.1:5000/API/pics/delete_album/${user}/${journal}/${album}`);
    const data = await res.json();
    if (data.status === 'success') {
      this.setState({ redirect: true })
    };
  }

  render() {
    const album = this.state.album
    return (
      this.state.redirect ? <Navigate to={`/journal/${this.props.params.journal}`} /> :
        album ?
          (
            <div className='album-page'>
              <div className='album-header'>
                <h1>{album.title}</h1>
              </div>
              {this.state.pic ? <Pic pic={this.state.pic} single={true} /> :
                <div>
                  <div className='album-header-info'>
                    <h6>No. of Pics: {this.state.pics.length}</h6>
                    <h6>Date Created: {album.date}</h6>
                  </div>
                  <div>
                    {this.state.add ?
                      (
                        <div className='col-5 m-4'>
                          <Upload user={this.props.user.id} album={this.props.params.album} journal={this.props.params.journal} reRender={this.reRender} />
                        </div>
                      ) : (
                        <button className='album-btns btn btn-primary' onClick={(e) => { this.addToAlbum(e) }}>+ Add To Album</button>
                      )
                    }
                    <button className='album-btns btn btn-danger' onClick={(e) => { this.deleteAlbum(e) }} >Delete Album</button>
                  </div>
                  <div className='book-of-pics d-flex justify-content-evenly'>
                    {this.loopThroughPics(this.state.pics)}
                  </div>
                </div>
              }
            </div>
          ) : (
            <h1>Loading...</h1>
          )
    )
  }
}
export default withParams(AlbumPage);