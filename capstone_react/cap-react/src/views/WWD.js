import React, { Component } from 'react'
import Upload from '../components/Upload'
import Photos from '../components/Photos'

export default class WWD extends Component {

    render() {
        console.log(this.props.currentUser.token)
        return (
            <div className='col-3'>
                <h1>Page explaining what the App does</h1>
                <Upload user={this.props.currentUser.token}/>

                <Photos user={this.props.currentUser.token}/>
            </div>
        )
    }
}
