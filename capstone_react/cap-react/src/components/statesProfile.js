import React, { Component } from 'react';
import AttractionsList from './AttractionsList';
import './statesProfile.css'
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
            <div className='d-flex flex-column mb-3'>
                <div className='d-flex justify-content-evenly'>
                    <StateCard state={this.props.state} />
                    <div className='atts d-flex flex-column align-items-center mb-3'>
                        <h2 className='text-decoration-underline p-3'>Popular State Attractions</h2>
                        <ol className='d-flex justify-content-space flex-wrap' id='atts'>
                            {this.loopThroughAtts(this.props.state.attractions)}
                        </ol>
                    </div>
                </div>
                <div className='rsns col-10 m-auto d-flex justify-content-between align-items-baseline'>
                    <h2 className='text-decoration-underline d-flex'>Top 5 Reasons to Visit</h2>
                    <ol className='d-flex col-9 justify-content-evenly' id='rsns'>
                        {this.loopThroughRsns(this.props.state.reasons)}
                    </ol>
                </div>
            </div>
        )
    }
};

export default withParams(StatesProfile);