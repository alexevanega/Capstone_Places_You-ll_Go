import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { withParams } from '../hoc';
import AlbumCard from '../components/AlbumCard';
import EntryCard from '../components/EntryCard';
import { faPlus, faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './journalPage.css'

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
    this.setState({ trigger: true })
  }

  componentDidMount() {
    this.grabJournal()
  }

  componentDidUpdate() {
    if (this.state.trigger !== false) {
      this.grabJournal()
      this.setState({ trigger: false })
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
    this.setState({ redirect: true });
    this.props.deleteJournal(e, journal);
  }


  render() {
    const journal = this.state.journal;
    return (
      this.state.redirect ? <Navigate to={'/profile'} /> :
        journal ? (
          <div className='journalpage-main'>
            <div className='journalpage-header'>
              <h1 className='header-title' style={{textTransform:'capitalize'}}>{journal.title}</h1>
              <div className='buttons-journalpage d-flex align-items-baseline'>
              <button className='delete-journal m-2 ps-4 pe-4' onClick={(e) => { this.delete(e) }}>
                <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              <Link style={{color:'black',textDecoration:'none'}} to={`/Edit_journal/${journal.id}`}>
                <div className='d-flex align-items-baseline m-2 ps-2'>
                  <FontAwesomeIcon icon={faEdit} />
                  <p>Edit Journal</p>
                </div>
                
                </Link>
              </div>
            </div>
            <div className='journalpage-contents'>

              <div className='journalpage-entries col-5'>

                {this.loopThroughEntries(this.state.journal.entries)}
              </div>
              <div className='secondary-stuff col-4'>
                <div className='buttons'>
                  <Link style={{ color: 'black' }} to={`/journal/${journal.id}/AddEntry`}>
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                      <p>Add Entry</p>
                    </div>
                  </Link>
                  <Link style={{ color: 'black' }} to={`/Add_Album/${journal.id}`}>
                    <div>
                      <FontAwesomeIcon icon={faPlus} />
                      <p>Create New Album</p>
                    </div>
                  </Link>
                </div>
                <div className='journalpage-albums'>
                  {this.loopThroughAlbums(this.state.journal.albums)}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1>loading...</h1>
        )

    )
  }
}

export default withParams(JournalPage);