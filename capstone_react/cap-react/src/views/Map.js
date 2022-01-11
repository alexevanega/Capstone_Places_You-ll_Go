import React, { Component } from 'react';
import './map.css'; /* optional for styling like the :hover pseudo-class */
import USAMap from "react-usa-map";

class App extends Component {
  /* mandatory */
  mapHandler = (event) => {
    alert(event.target.dataset.name);
    
  };

  /* optional customization of filling per state and calling custom callbacks per state */
  statesCustomConfig = () => {
    return {
        "AL": {
            fill: 'inherit'
        },
        "AK": {
            fill: 'inherit'
        },
        "AZ": {
            fill: 'inherit'
        },
        "AR": {
            fill: 'inherit'
        },
        "CA": {
            fill: 'inherit'
        },
        "CO": {
            fill: 'inherit'
        },
        "CT": {
            fill: 'inherit'
        },
        "DC": {
            fill: 'inherit'
        },
        "DE": {
            fill: 'inherit'
        },
        "FL": {
            fill: 'inherit'
        },
        "GA": {
            fill: 'inherit'
        },
        "HI": {
            fill: 'inherit'
        },
        "ID": {
            fill: 'inherit'
        },
        "IL": {
            fill: 'inherit'
        },
        "IN": {
            fill: 'inherit'
        },
        "IA": {
            fill: 'inherit'
        },
        "KS": {
            fill: 'inherit'
        },
        "KY": {
            fill: 'inherit'
        },
        "LA": {
            fill: 'inherit'
        },
        "ME": {
            fill: 'inherit'
        },
        "MD": {
            fill: 'inherit'
        },
        "MA": {
            fill: 'inherit'
        },
        "MI": {
            fill: 'inherit'
        },
        "MN": {
            fill: 'inherit'
        },
        "MS": {
            fill: 'inherit'
        },
        "MO": {
            fill: 'inherit'
        },
        "MT": {
            fill: 'inherit'
        },
        "NE": {
            fill: "inherit",
            clickHandler: (event) => console.log('Custom handler for NJ', event.target.dataset)
        },
        "NV": {
            fill: "inherit",     
        },
        "NH": {
            fill: "inherit",     
        },
        "NJ": {
            fill: "inherit",     
        },
        "NM": {
            fill: "inherit",     
        },
        "NY": {
            fill: "inherit",     
        },
        "NC": {
            fill: "inherit",     
        },
        "ND": {
            fill: "inherit",     
        },
        "OH": {
            fill: "inherit",     
        },
        "OK": {
            fill: "inherit",     
        },
        "OR": {
            fill: "inherit",     
        },
        "PA": {
            fill: "inherit",     
        },
        "RI": {
            fill: "inherit",     
        },
        "SC": {
            fill: "inherit",     
        },
        "SD": {
            fill: "inherit",     
        },
        "TN": {
            fill: "inherit",     
        },
        "TX": {
            fill: "inherit",     
        },
        "UT": {
            fill: "inherit",     
        },
        "VA": {
            fill: "inherit",     
        },
        "VT": {
            fill: "inherit",     
        },
        "WA": {
            fill: "inherit",     
        },
        "WV": {
            fill: "inherit",     
        },
        "WI": {
            fill: "inherit",     
        },
        "WY": {
            fill: "inherit",     
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
