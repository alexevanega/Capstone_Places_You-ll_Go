import React, { Component } from 'react';
import './map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";

class App extends Component {

    constructor() {
        super();
        this.state = {
                AL: 'inherit',
                AK: 'inherit',
                AZ: 'inherit',
                AR: 'inherit',
                CA: 'inherit',
                CO: 'inherit',
                CT: 'inherit',
                DC: 'inherit',
                DE: 'inherit',
                FL: 'inherit',
                GA: 'inherit',
                HI: 'inherit',
                ID: 'inherit',
                IL: 'inherit',
                IN: 'inherit',
                IA: 'inherit',
                KS: 'inherit',
                KY: 'inherit',
                LA: 'inherit',
                ME: 'inherit',
                MD: 'inherit',
                MA: 'inherit',
                MI: 'inherit',
                MN: 'inherit',
                MS: 'inherit',
                MO: 'inherit',
                MT: 'inherit',
                NE: 'inherit',
                NV: 'inherit',
                NH: 'inherit',
                NJ: 'inherit',
                NM: 'inherit',
                NY: 'inherit',
                NC: 'inherit',
                ND: 'inherit',
                OH: 'inherit',
                OK: 'inherit',
                OR: 'inherit',
                PA: 'inherit',
                RI: 'inherit',
                SC: 'inherit',
                SD: 'inherit',
                TN: 'inherit',
                TX: 'inherit',
                UT: 'inherit',
                VA: 'inherit',
                VT: 'inherit',
                WA: 'inherit',
                WV: "inherit",
                WI: "inherit",
                WY: "inherit",
        };
}


  /* mandatory */
  mapHandler = (event) => {
      if (this.state[event.target.dataset.name] === 'inherit') {this.setState({[event.target.dataset.name]: 'red'})}
      else {this.setState({[event.target.dataset.name]: 'inherit'})};
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
    return {
        "AL": {
            fill: this.state['AL']
        },
        "AK": {
            fill: this.state['AK']
        },
        "AZ": {
            fill: this.state['AZ']
        },
        "AR": {
            fill: this.state['AR']
        },
        "CA": {
            fill: this.state['CA']
        },
        "CO": {
            fill: this.state['CO']
        },
        "CT": {
            fill: this.state['CT']
        },
        "DC": {
            fill: this.state['DC']
        },
        "DE": {
            fill: this.state['DE']
        },
        "FL": {
            fill: this.state['FL']
        },
        "GA": {
            fill: this.state['GA']
        },
        "HI": {
            fill: this.state['HI']
        },
        "ID": {
            fill: this.state['ID']
        },
        "IL": {
            fill: this.state['IL']
        },
        "IN": {
            fill: this.state['IN']
        },
        "IA": {
            fill: this.state['IA']
        },
        "KS": {
            fill: this.state['KS']
        },
        "KY": {
            fill: this.state['KY']
        },
        "LA": {
            fill: this.state['LA']
           },
        "ME": {
            fill: this.state['ME']
        },
        "MD": {
            fill: this.state['MD']
        },
        "MA": {
            fill: this.state['MA']
        },
        "MI": {
            fill: this.state['MI']
        },
        "MN": {
            fill: this.state['MN']
        },
        "MS": {
            fill: this.state['MS']
        },
        "MO": {
            fill: this.state['MO']
        },
        "MT": {
            fill: this.state['MT']
        },
        "NE": {
            fill: this.state['NE']
        },
        "NV": {
            fill: this.state['NV']     
        },
        "NH": {
            fill: this.state['NH']     
        },
        "NJ": {
            fill: this.state['NJ']     
        },
        "NM": {
            fill: this.state['NM']    
        },
        "NY": {
            fill: this.state['NY']     
        },
        "NC": {
            fill: this.state['NC']     
        },
        "ND": {
            fill: this.state['ND']     
        },
        "OH": {
            fill: this.state['OH']     
        },
        "OK": {
            fill: this.state['OK']     
        },
        "OR": {
            fill: this.state['OR']     
        },
        "PA": {
            fill: this.state['PA']     
        },
        "RI": {
            fill: this.state['RI']     
        },
        "SC": {
            fill: this.state['SC']     
        },
        "SD": {
            fill: this.state['SD']     
        },
        "TN": {
            fill: this.state['TN']     
        },
        "TX": {
            fill: this.state['TX']     
        },
        "UT": {
            fill: this.state['UT']     
        },
        "VA": {
            fill: this.state['VA']     
        },
        "VT": {
            fill: this.state['VT']     
        },
        "WA": {
            fill: this.state['WA']     
        },
        "WV": {
            fill: this.state['WV']     
        },
        "WI": {
            fill: this.state['WI']     
        },
        "WY": {
            fill: this.state['WY']     
        },
    };
  };

  render() {
    return (
      <div className="App">
        <USAMap customize={this.statesCustomConfig()} onClick={this.mapHandler} />
      </div>
    );
  }
}

export default App;
