import React, { Component } from 'react'
import StateBadge from '../components/stateBadge'
import StatesProfile from '../components/statesProfile';

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
            <>
                <h1 className='text-decoration-underline d-flex justify-content-center'>Where Will You Go!</h1>
                <div className='d-flex flex-wrap'>
                    {this.loopThroughStates(this.props.states)}
                </div>
            </>
        )
    }
}
