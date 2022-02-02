import React, { Component } from 'react';
import './stateBadge.css'

export default class StateBadge extends Component {
    render() {
        const state = this.props.state
        return (
            <div className='m-4 col-2'>
                <div className="card pt-3 d-flex flex-column align-items-center" style={{width: "20rem"}}>
                        <img src={state.flag} style={{width:"10rem"}} onClick={(e)=>{this.props.pullTheProfile(e,this.props.state)}} className="card-img-top" alt="..."/>
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 className='card-title text-decoration-underline'>{state.name}</h5>
                            <p className="card-text">{state.abbr}</p>
                        </div>
                </div>
            </div>
        )
    }
}
