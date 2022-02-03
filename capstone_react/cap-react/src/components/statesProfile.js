import React, { Component } from 'react';
import AttractionsList from './AttractionsList';
import '../css/statesProfile.css'
import { withParams } from '../hoc';
import ReasonsList from './ReasonsList';
import StateCard from './StateCard';

class StatesProfile extends Component {


    loopThroughAtts = (listOfAtts) => {
        return listOfAtts.map(att => <AttractionsList key={att.att} att={att} />)
    }

    loopThroughRsns = (listofRsns) => {
        return listofRsns.map(rsn => <ReasonsList key={rsn.reason} rsn={rsn} />)
    }

    render() {
        return (
            <div className='state-profile'>
                <div className='state-profile-main'>
                    <StateCard state={this.props.state} />
                </div>
                <div className='state-profile-sect'>
                    <div className='atts'>
                        <h2 className='text-decoration-underline p-3'>Popular State Attractions</h2>
                        <ol className='d-flex justify-content-space flex-wrap' id='atts'>
                            {this.loopThroughAtts(this.props.state.attractions)}
                        </ol>
                    </div>
                    <div className='rsns'>
                        <h2 className='text-decoration-underline d-flex'>Top 5 Reasons to Visit</h2>
                        <ol className='rsn'>
                            {this.loopThroughRsns(this.props.state.reasons)}
                        </ol>
                    </div>
                </div>
            </div>
        )
    }
};

export default withParams(StatesProfile);