import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { withParams } from '../hoc';
import AlbumCard from '../components/AlbumCard';
import EntryCard from '../components/EntryCard';

class JournalPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      journal: null,
      redirect: null,
      trigger: false
    }
  }

  grabJournal = async () => {
    const journal = this.props.params.journal;
    const res = await fetch(`http://127.0.0.1:5000/API/journals/grab_individual_journal/${journal}`);
    const data = await res.json()
    this.setState({ journal: data })
  }

  reRender = () => {
    this.setState({trigger: true})
  }

  componentDidMount() {
    this.grabJournal()
  }

  componentDidUpdate() {
    if (this.state.trigger !== false) {
      this.grabJournal()
      this.setState({trigger: false})
    }
  }

  loopThroughEntries = (listofentries) => {
    return listofentries.map(entry => <EntryCard key={entry.id} reRender={this.reRender} entry={entry} />)
  }

  loopThroughAlbums = (listofalbums) => {
    return listofalbums.map(album => <AlbumCard key={album.album} reRender={this.reRender} journal={this.state.journal.id} album={album} />)
  }

  delete = (e) => {
    e.preventDefault();
    const journal = this.props.params.journal;
    this.setState({redirect: true});
    this.props.deleteJournal(e,journal);
  }
  

  render() {
    const journal = this.state.journal;
    return (
      this.state.redirect ? <Navigate to={'/profile'}/>:
        journal ? (
      <div>
        <div>
          <h1>{journal.title}</h1>
          <button className='btn btn-link' onClick={(e) => { this.delete(e) }}>Delete Journal</button>
          <Link to={`/Edit_journal/${journal.id}`}><p className='btn btn-link'>Edit Journal</p></Link>
        </div>
        <div>
          <Link to={`/journal/${journal.id}/AddEntry`}><p>Add Entry</p></Link>
          {this.loopThroughEntries(this.state.journal.entries)}
        </div>
        <div>
          <Link to={`/Add_Album/${journal.id}`}><p>Create New Album</p></Link>
          {this.loopThroughAlbums(this.state.journal.albums)}
        </div>
      </div>
      ):(
        <h1>loading...</h1>
      )
    
    )
  }
}

export default withParams(JournalPage);