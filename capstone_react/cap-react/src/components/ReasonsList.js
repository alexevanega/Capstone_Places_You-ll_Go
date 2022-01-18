import React, { Component } from 'react'

export default class ReasonsList extends Component {
    render() {
        const rsn = this.props.rsn
        return (
            <div className='rsn flex-fill'>
                <h4>{rsn.reason}</h4>
            </div>
        )
    }
}
