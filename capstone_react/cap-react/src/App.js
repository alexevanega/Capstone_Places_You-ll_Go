import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import WWD from './views/WWD';
import Map from './views/Map';
import Login from './views/login';
import Signup from './views/Signup';

export default class App extends Component {

  constructor() {
    super();
    this.state = {
      states: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Conneticut', 'Delaware', 'Florida',
        'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
        'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico',
        'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina',
        'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Virginia', 'Vermont', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'],

      isLoggedIn: false,
      currentUser: null,
      hasVisited: []
    }

  }

  logMeIn = (user) => {
    this.setState({
      isLoggedIn: true,
      currentUser: user
    })
  }

  logMeOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: null
    })
  }


  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} currentUser={this.state.currentUser}/>
        <h1>Oh, The Places You'll Go!</h1>
        <Routes>
          <Route path='/WWD' element={<WWD />} />
          <Route path='/Map' element={<Map />} />
          <Route path='/login' element={<Login logMeIn={this.logMeIn}/>} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    )
  }
}
