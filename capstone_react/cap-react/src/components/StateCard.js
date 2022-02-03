import React, { Component } from 'react';
import '../css/stateCard.css'

export default class StateCard extends Component {
    render() {
        const state = this.props.state
        
        return (
            <div className='state-card-shell'>
                <div className="state-card-main card">
                        <div className="flag">
                            <img src={state.flag} className="badge-img" alt={state.abbr} />
                        </div>
                        <div className="state-attr d-flex flex-column align-items-center">
                            <h5 className="card-title">{state.name}</h5>
                            <div className="state-info card-body d-flex flex-wrap justify-content-center">
                                <p className="card-text">Abbreviation: {state.abbr}</p>
                                <p className="card-text">Nickname: {state.nickname}</p>
                                <p className="card-text">Capitol: {state.capital}</p>
                                <p className="card-text">Largest City: {state.largest_city}</p>
                                <p className="card-text">Population: {state.population}</p>
                                <p className="card-text">Timezone: {state.timezone}</p>
                                <p className="card-text">Best Season to Visit: {state.season}</p>
                            </div>
                        </div>
                </div>
                
            </div>
        )
    }
}
