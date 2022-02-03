import React, { Component } from 'react';
import { Link } from 'react-router-dom';



export default class Upload extends Component {

    state = {
        selectedFile: null
    }

    imageSelectedHandler = event => {
        console.log(event.target.files[0]);
        this.setState({ selectedFile: event.target.files[0] });
    }

    fileUploadHandler = async (e) => {
        e.preventDefault();
        console.log('sending file...', this.state);
        const file = new FormData();
        file.append('image', this.state.selectedFile, this.state.selectedFile.name);
        file.set('journal', this.props.journal);
        file.set('album', this.props.album);
        file.set('user', this.props.user);

        fetch('http://127.0.0.1:5000/API/pics/uploads',
            {
                method: 'POST',
                body: file
            }
        )
            .then((response) => response.json())
            .then((result) => { console.log('success', result); this.props.reRender()});
    }

    render() {
        const album = this.props.album
        return (
            <>
                <div className="uplopad-bar input-group mb-3">
                    <input type="file" onChange={this.imageSelectedHandler} className="form-control me-2" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-default" />
                    <Link to={`/Album/${album}`}><span className="input-group-text btn btn-primary" onClick={(e) => { this.fileUploadHandler(e) }} id="inputGroup-sizing-default">Upload</span></Link>
                </div>
            </>
        )
    }
}
