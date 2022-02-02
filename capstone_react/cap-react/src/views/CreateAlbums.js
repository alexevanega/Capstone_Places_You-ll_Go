import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { withParams } from '../hoc';

class CreateAlbums extends Component {

    constructor() {
        super();
        this.state = {
            title: '',
            desc: '',
            redirect: null
        }
    }

    titleHandler = event => {
        this.setState({ title: event.target.value })
    }

    descHandler = event => {
        this.setState({ desc: event.target.value })
    }

    submitAlbum = async (event) => {
        event.preventDefault();
        const album = new FormData();
        album.set('title', this.state.title);
        album.set('desc', this.state.desc);
        album.set('user', this.props.user.id);
        album.set('journal', this.props.params.journal);

        fetch('http://127.0.0.1:5000/API/pics/add_album',
            {
                method: 'POST',
                body: album
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('success', result);this.props.reRender();this.setState({redirect: true})});

    }

    render() {
        return (
            this.state.redirect ? <Navigate to={`/Journal/${this.props.params.journal}`}/>:
            <>
                <label className="form-label">Album Title</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={this.titleHandler} aria-describedby="basic-addon3" />
                </div>
                <label className="form-label">Brief Album Description</label>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" onChange={this.descHandler} aria-describedby="basic-addon3" />
                </div>
                <div>
                    <button type="button" onClick={(e) => {this.submitAlbum(e)} } className="btn btn-dark">Create Album</button>
                </div>
            </>
        )
    }
}
export default withParams(CreateAlbums)