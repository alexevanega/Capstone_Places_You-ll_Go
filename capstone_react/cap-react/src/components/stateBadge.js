import React, { Component } from 'react';
import './stateBadge.css'

export default class StateBadge extends Component {
    render() {
        const state = this.props.state
        return (
            <div className='main-card d-flex m-4 col-2'>
                <div className="card-mid col-10 m-auto pt-4 d-flex flex-column align-items-center">
                        <img className='card-img' src={state.flag} onClick={(e)=>{this.props.pullTheProfile(e,this.props.state)}} alt={state.abbr}/>
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 className='card-title text-decoration-underline'>{state.name}</h5>
                            <p className="card-text">{state.abbr}</p>
                        </div>
                </div>
            </div>
        )
    }
}
