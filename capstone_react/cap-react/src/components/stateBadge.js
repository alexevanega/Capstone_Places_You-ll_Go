import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './stateBadge.css'

export default class StateBadge extends Component {
    render() {
        const state = this.props.state
        return (
            <div className='m-4 col-2'>
                <div className="card pt-3 d-flex flex-column align-items-center" style={{width: "20rem"}}>
                    <Link to={`/plan/${state.name}`}>
                        <img src={state.flag} style={{width:"10rem"}} className="card-img-top" alt="..."/>
                    </Link>
                        <div className="card-body d-flex flex-column align-items-center">
                            <h5 className='card-title text-decoration-underline'>{state.name}</h5>
                            <p className="card-text">{state.abbr}</p>
                        </div>
                </div>
            </div>
        )
    }
}
