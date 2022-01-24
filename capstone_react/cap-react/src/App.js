import React, { Component } from 'react';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WWD from './views/WWD';
import Map from './views/Map';
import Profile from './views/profile';
import States from './views/States';
import Login from './views/login';
import Signup from './views/Signup';
import StatesProfile from './views/statesProfile';

export default class App extends Component {

  constructor() {
    super();
    console.log('I was created')
    const user = localStorage.getItem('app_user');
    if (user) {
      this.state = {
        isLoggedIn: true,
        currentUser: JSON.parse(user),
        states: [],
        Albums: [],
        visitedStates: []
      }
    } else {
      this.state = {
        isLoggedIn: false,
        currentUser: null,
        states: [],
        visitedStates: []
      }
    }
  }

  logMeIn = (user) => {
    this.setState({
      isLoggedIn: true,
      currentUser: user
    })
    localStorage.setItem('app_user', JSON.stringify(user))
  }

  logMeOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: {}
    })
    localStorage.removeItem('app_user');
  }

  getStatesInfo = async () => {
    const res = await fetch('http://127.0.0.1:5000/API/States');
    const data = await res.json();
    console.log(data)
    this.setState({
      states: data
    })
  }

  componentDidMount() {
    console.log('I have mounted')
    this.getStatesInfo()
  }


  render() {
    console.log('I rendered: ',this.state.currentUser)
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} logMeOut={this.logMeOut} currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<WWD currentUser={this.state.currentUser} />} />
          <Route path='/Map' element={<Map states={this.state.states} />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/plan' element={<States states={this.state.states} />} />
          <Route path='/plan/:state' element={<StatesProfile />} /> 
          <Route path='/login' element={<Login logMeIn={this.logMeIn} />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    )
  }
}
