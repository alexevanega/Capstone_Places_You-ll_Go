import React, { Component } from 'react';
// import axios from 'axios'



export default class Upload extends Component {

    state = {
        selectedFile: null,
        album: '',
        user: this.props.user
    }

    imageSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({selectedFile: event.target.files[0]});
    }

    albumSelectedHandler = event => {
        this.setState({album: event.target.value});
    }


    fileUploadHandler = async (e) => {
        console.log('sending file...', this.state)
        const file = new FormData();
        file.append('image', this.state.selectedFile, this.state.selectedFile.name);
        file.set('album',this.state.album);
        file.set('user', this.state.user);

        fetch('http://127.0.0.1:5000/upload',
        {
            method: 'POST',
            body: file
        }
        )
            .then((response) => response.json())
            .then((result) => {console.log('success', result);});
    }

    render() {
        console.log(this.state)
        return (
            <>
            <input type='text' onChange={this.albumSelectedHandler} value={this.state.album} className='form-control'/>
            <div className="input-group mb-3">
                <input type="file" onChange={this.imageSelectedHandler} className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default"/>
                <span className="input-group-text btn btn-primary" onClick={(e) => {this.fileUploadHandler(e)}} id="inputGroup-sizing-default">Upload</span>
            </div>
            </>
        )
    }
}
