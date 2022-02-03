import React, { Component } from 'react';
import './map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";

class Map extends Component {

    constructor() {
        super();
        this.state = {
            fillers: null,
            trigger: false
        };
    }


    /* mandatory */
    mapHandler = (event) => {
        const clickedstate = event.target.dataset.name;
        const map = JSON.parse(localStorage.getItem('map'));
        const newMap = {};
        Object.entries(map).forEach(([state,filler]) => {
            if (state === clickedstate && filler==='inherit' ) { newMap[state]='red' }
            else if (state === clickedstate && filler==='red') {newMap[state]='inherit'}
            else {newMap[state]=filler}
        });
        console.log('I have been clicked');
        localStorage.setItem('map', JSON.stringify(newMap));
        const filler = this.state.fillers[clickedstate]
        this.props.handleVisited(event,clickedstate,filler);
        this.setState({trigger:true})
    };

    componentDidMount() {
        const map = JSON.parse(localStorage.getItem('map'));
        console.log('map ready');
        this.setState({fillers:map})
    }

    componentDidUpdate() {
        const map = JSON.parse(localStorage.getItem('map'));
        if (this.state.trigger !== false) {
            this.setState({fillers:map, trigger: false });
            console.log('updated')
        }
    }

    /* optional customization of filling per state and calling custom callbacks per state */
    statesCustomConfig = () => {
        return {
            "AL": {
                fill: this.state.fillers['AL']
            },
            "AK": {
                fill: this.state.fillers['AK']
            },
            "AZ": {
                fill: this.state.fillers['AZ']
            },
            "AR": {
                fill: this.state.fillers['AR']
            },
            "CA": {
                fill: this.state.fillers['CA']
            },
            "CO": {
                fill: this.state.fillers['CO']
            },
            "CT": {
                fill: this.state.fillers['CT']
            },
            "DC": {
                fill: this.state.fillers['DC']
            },
            "DE": {
                fill: this.state.fillers['DE']
            },
            "FL": {
                fill: this.state.fillers['FL']
            },
            "GA": {
                fill: this.state.fillers['GA']
            },
            "HI": {
                fill: this.state.fillers['HI']
            },
            "ID": {
                fill: this.state.fillers['ID']
            },
            "IL": {
                fill: this.state.fillers['IL']
            },
            "IN": {
                fill: this.state.fillers['IN']
            },
            "IA": {
                fill: this.state.fillers['IA']
            },
            "KS": {
                fill: this.state.fillers['KS']
            },
            "KY": {
                fill: this.state.fillers['KY']
            },
            "LA": {
                fill: this.state.fillers['LA']
            },
            "ME": {
                fill: this.state.fillers['ME']
            },
            "MD": {
                fill: this.state.fillers['MD']
            },
            "MA": {
                fill: this.state.fillers['MA']
            },
            "MI": {
                fill: this.state.fillers['MI']
            },
            "MN": {
                fill: this.state.fillers['MN']
            },
            "MS": {
                fill: this.state.fillers['MS']
            },
            "MO": {
                fill: this.state.fillers['MO']
            },
            "MT": {
                fill: this.state.fillers['MT']
            },
            "NE": {
                fill: this.state.fillers['NE']
            },
            "NV": {
                fill: this.state.fillers['NV']
            },
            "NH": {
                fill: this.state.fillers['NH']
            },
            "NJ": {
                fill: this.state.fillers['NJ']
            },
            "NM": {
                fill: this.state.fillers['NM']
            },
            "NY": {
                fill: this.state.fillers['NY']
            },
            "NC": {
                fill: this.state.fillers['NC']
            },
            "ND": {
                fill: this.state.fillers['ND']
            },
            "OH": {
                fill: this.state.fillers['OH']
            },
            "OK": {
                fill: this.state.fillers['OK']
            },
            "OR": {
                fill: this.state.fillers['OR']
            },
            "PA": {
                fill: this.state.fillers['PA']
            },
            "RI": {
                fill: this.state.fillers['RI']
            },
            "SC": {
                fill: this.state.fillers['SC']
            },
            "SD": {
                fill: this.state.fillers['SD']
            },
            "TN": {
                fill: this.state.fillers['TN']
            },
            "TX": {
                fill: this.state.fillers['TX']
            },
            "UT": {
                fill: this.state.fillers['UT']
            },
            "VA": {
                fill: this.state.fillers['VA']
            },
            "VT": {
                fill: this.state.fillers['VT']
            },
            "WA": {
                fill: this.state.fillers['WA']
            },
            "WV": {
                fill: this.state.fillers['WV']
            },
            "WI": {
                fill: this.state.fillers['WI']
            },
            "WY": {
                fill: this.state.fillers['WY']
            },
        };
    };

    render() {
        return (
            this.state.fillers ?
            (<div className="App">
                <div className='map-header'>
                    <h1>Keep track of where you've been!</h1>
                    <h4>Just click on any state you have visited.</h4>
                </div>
                <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
            </div>)
            :
            (<h1>Loading Map....</h1>)
        );
    }
}

export default Map;
