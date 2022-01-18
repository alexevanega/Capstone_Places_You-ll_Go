import React, { Component } from 'react'

export default class AttractionsList extends Component {
    render() {
        const att = this.props.att
        return (
            <div className='col-6 d-flex flex-column justify-content-center'>
                <div className="attract">
                    <div className="ms-2">
                        <h5>{att.att}</h5>
                        {att.loc}, {att.state}
                    </div>
                </div>
            </div>
        )
    }
}
