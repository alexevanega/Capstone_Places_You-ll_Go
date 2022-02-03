import React, { Component } from 'react'
import StateBadge from '../components/stateBadge'
import StatesProfile from '../components/statesProfile';
import './states.css'

export default class States extends Component {

    constructor() {
        super();
        this.state = {
            profile: false
        }
    }

    pullTheProfile = (e,state) => {
        e.preventDefault();
        this.setState({profile:state})
    }

    loopThroughStates = (listofStates) => {
        return listofStates.map(state => <StateBadge key={state.name} state={state} pullTheProfile={this.pullTheProfile} />)
    }

    render() {
        return (
            this.state.profile ? <StatesProfile state={this.state.profile} />:
            <div className='master-states d-flex justify-content-center'>
                <div className='states d-flex flex-wrap align-items-center justify-content-center col-10'>
                    {this.loopThroughStates(this.props.states)}
                </div>
            </div>
        )
    }
}
