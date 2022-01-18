import React, { Component } from 'react';
import AttractionsList from '../components/AttractionsList';
import './statesProfile.css'
import { withParams } from '../hoc';
import ReasonsList from '../components/ReasonsList';
import StateCard from '../components/StateCard';

class StatesProfile extends Component {

    constructor() {
        super();
        this.state = {
            state_info: {},
            state_att: [],
            state_reasons: []
        }
    }

    getStateInfo = async () => {
        const state = this.props.params.state;
        const res = await fetch(`http://127.0.0.1:5000/API/States/${state}`);
        const data = await res.json();
        this.setState({ state_info: data[0] })
    }

    getStateAtt = async () => {
        const state = this.props.params.state;
        const res = await fetch(`http://127.0.0.1:5000/API/States/attractions/${state}`);
        const data = await res.json();
        this.setState({ state_att: data })
    }

    getStateReasons = async () => {
        const state = this.props.params.state;
        const res = await fetch(`http://127.0.0.1:5000/API/States/reasons/${state}`);
        const data = await res.json();
        this.setState({ state_reasons: data })
    }

    componentDidMount() {
        this.getStateInfo()
        this.getStateAtt()
        this.getStateReasons()
    }

    loopThroughAtts = (listOfAtts) => {
        return listOfAtts.map(att => <AttractionsList key={att.att} att={att} />)
    }

    loopThroughRsns = (listofRsns) => {
        return listofRsns.map(rsn => <ReasonsList key={rsn.reason} rsn={rsn} />)
    }

    render() {
        console.log(this.state)
        return (
            <div className='d-flex flex-column mb-3'>
                <div className='d-flex justify-content-evenly align-items-start'>
                    <StateCard state={this.state.state_info} />
                    <div className='atts d-flex flex-column align-items-center mb-3'>
                        <h2 className='text-decoration-underline p-3'>Popular State Attractions</h2>
                        <ol className='d-flex justify-content-space flex-wrap' id='atts'>
                            {this.loopThroughAtts(this.state.state_att)}
                        </ol>
                    </div>
                </div>
                <div className='rsns col-10 m-auto d-flex justify-content-between align-items-baseline'>
                    <h2 className='text-decoration-underline d-flex'>Top 5 Reasons to Visit</h2>
                    <ol className='d-flex col-9 justify-content-evenly' id='rsns'>
                        {this.loopThroughRsns(this.state.state_reasons)}
                    </ol>
                </div>
            </div>
        )
    }
};

export default withParams(StatesProfile);