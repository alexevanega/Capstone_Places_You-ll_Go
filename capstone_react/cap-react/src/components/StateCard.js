import React, { Component } from 'react';

export default class StateCard extends Component {
    render() {
        const state = this.props.state
        
        return (
            <>
                <div className="state card d-flex flex-column align-items-center" style={{ width: "25rem" }}>
                    <div>
                        <div className="flag">
                            <img src={state.flag} style={{ width: "20rem" }} className="img-fluid rounded-3" alt="..." />
                        </div>
                        <div className="d-flex flex-column align-items-center">
                            <h5 className="card-title">{state.name}</h5>
                            <div className="card-body d-flex flex-wrap justify-content-center">
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
                
            </>
        )
    }
}
