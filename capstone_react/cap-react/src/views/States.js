import React, { Component } from 'react'
import StateBadge from '../components/stateBadge'

export default class States extends Component {

    loopThroughStates = (listofStates) => {
        return listofStates.map(state => <StateBadge key={state.name} state={state} />)
    }

    render() {
        return (
            <>
                <h1 className='text-decoration-underline d-flex justify-content-center'>Where Will You Go!</h1>
                <div className='d-flex flex-wrap'>
                    {this.loopThroughStates(this.props.states)}
                </div>
            </>
        )
    }
}
