import React, { Component } from 'react';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import WWD from './views/WWD';
import Map from './views/Map';
import Profile from './views/Profile';
import CreateJournal from './views/CreateJournal';
import JournalPage from './views/JournalPage';
import States from './views/States';
import Login from './views/login';
import Signup from './views/Signup';
import Albums from './views/Albums';
import AlbumPage from './views/AlbumPage';
import EditEntry from './views/EditEntry';
import EditJournal from './views/EditJournal';
import CreateAlbums from './views/CreateAlbums';
import AddEntry from './views/AddEntry';

export default class App extends Component {

  constructor() {
    super();
    console.log('I was created')
    const user = localStorage.getItem('app_user');
    const states = localStorage.getItem('states');
    if (user) {
      this.state = {
        isLoggedIn: true,
        currentUser: JSON.parse(user),
        journals: [],
        states: JSON.parse(states),
        visited: [],
        trigger: false
      }
    } else {
      this.state = {
        isLoggedIn: false,
        currentUser: null,
        journals: [],
        states: [],
        visited: [],
        trigger: false
      }
    }
  }

  logMeIn = (user) => {
    this.setState({
      isLoggedIn: true,
      currentUser: user,
      trigger: true
    })
    localStorage.setItem('app_user', JSON.stringify(user));
  }

  logMeOut = () => {
    this.setState({
      isLoggedIn: false,
      currentUser: {},
      journals: [],
      visited: []
    })
    localStorage.removeItem('app_user');
    localStorage.removeItem('map');
    this.reRender();
  }

  handleVisited = async (e, state, filler) => {
    e.preventDefault();
    const res = await fetch('http://127.0.0.1:5000/API/States/handlevisited', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        state: state,
        user: this.state.currentUser.id,
        filler: filler
      })
    })
    const data = await res.json();
    if (data.status === 'success') {
      console.log(data.message);
    }
  }
  setUpForMap = () => {
    const map = {}
    const ref = {}
    const states = {
      AL: 'inherit', AK: 'inherit', AZ: 'inherit', AR: 'inherit', CA: 'inherit', CO: 'inherit', CT: 'inherit', DC: 'inherit', DE: 'inherit', FL: 'inherit', GA: 'inherit', HI: 'inherit',
      ID: 'inherit', IL: 'inherit', IN: 'inherit', IA: 'inherit', KS: 'inherit', KY: 'inherit', LA: 'inherit', ME: 'inherit', MD: 'inherit', MA: 'inherit', MI: 'inherit', MN: 'inherit', MS: 'inherit',
      MO: 'inherit', MT: 'inherit', NE: 'inherit', NV: 'inherit', NH: 'inherit', NJ: 'inherit', NM: 'inherit', NY: 'inherit', NC: 'inherit', ND: 'inherit', OH: 'inherit', OK: 'inherit', OR: 'inherit', PA: 'inherit',
      RI: 'inherit', SC: 'inherit', SD: 'inherit', TN: 'inherit', TX: 'inherit', UT: 'inherit', VA: 'inherit', VT: 'inherit', WA: 'inherit', WV: "inherit", WI: "inherit", WY: "inherit"
    };
    const visited = this.state.visited;
    Object.entries(visited).forEach(([s,vs])=>{ref[vs.state]=true});
    Object.entries(states).forEach(([s,f])=>{
      if (s in ref){map[s]='red'}
      else{map[s]=f}
    });
    localStorage.setItem('map',JSON.stringify(map));
    console.log('map set')
  }

  reRender = () => { this.setState({ trigger: true }) };

  getStatesInfo = async () => {
    const res = await fetch('http://127.0.0.1:5000/API/States');
    const data = await res.json();
    localStorage.setItem('states', JSON.stringify(data))
  }

  getVisited = async () => {
    const res = await fetch(`http://127.0.0.1:5000/API/States/get_visited_states/${this.state.currentUser.id}`);
    const data = await res.json();
    this.setState({visited:data});
    this.setUpForMap();
  }

  getJournals = async () => {
    const res = await fetch(`http://127.0.0.1:5000/API/journals/${this.state.currentUser.id}`);
    const data = await res.json();
    console.log('journals grabbed')
    this.setState({ journals: data })
  }

  deleteJournal = async (event, id) => {
    event.preventDefault();
    const res = await fetch(`http://127.0.0.1:5000/API/journals/delete_journal/${id}`);
    const data = await res.json();
    console.log(data);
    this.reRender();
  }

  componentDidMount() {
    console.log('I have mounted')
    this.getStatesInfo();
    if (this.state.isLoggedIn === true) {
      this.getJournals();
      this.getVisited();
    }
    else {
      this.setUpForMap();
    }
  }

  componentDidUpdate() {
    if (this.state.trigger !== false && this.state.isLoggedIn === true) {
      this.getJournals();
      this.getVisited();
      this.setState({ trigger: false })
    }
    else{
      this.setUpForMap();
    }
  }


  render() {
    return (
      <div>
        <Navbar isLoggedIn={this.state.isLoggedIn} logMeOut={this.logMeOut} currentUser={this.state.currentUser} />
        <Routes>
          <Route path='/' element={<WWD />} />
          <Route path='/Map' element={<Map handleVisited={this.handleVisited} />} />
          <Route path='/profile' element={<Profile user={this.state.currentUser} journals={this.state.journals} reRender={this.reRender} deleteJournal={this.deleteJournal} />} />

          <Route path='/Journal/:journal' element={<JournalPage user={this.state.currentUser} deleteJournal={this.deleteJournal} />} />
          <Route path='/Create_Journal' element={<CreateJournal reRender={this.reRender} user={this.state.currentUser} />} />
          <Route path='/Edit_Journal/:journal' element={<EditJournal reRender={this.reRender} />} />

          <Route path='/journal/:journal/AddEntry' element={<AddEntry reRender={this.reRender} />} />
          <Route path='/EntryEdit/:entry' element={<EditEntry currentUser={this.state.currentUser} reRender={this.reRender} />} />

          <Route path='/Photo_Albums' element={<Albums albums={this.state.albums} />} />
          <Route path='/Album/:journal/:album' element={<AlbumPage user={this.state.currentUser} />} />
          <Route path='/Add_Album/:journal' element={<CreateAlbums user={this.state.currentUser} reRender={this.reRender} />} />

          <Route path='/plan' element={<States states={this.state.states} />} />

          <Route path='/login' element={<Login logMeIn={this.logMeIn} />} />
          <Route path='/Signup' element={<Signup />} />
        </Routes>
      </div>
    )
  }
}
