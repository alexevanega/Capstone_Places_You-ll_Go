import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JournalBadge from '../components/JournalBadge';
import ProfileBadge from '../components/ProfileBadge';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../css/profile.css'

export default class Profile extends Component {


    loopThroughJournals = (journalslist) => {
        return journalslist.map(journal => <JournalBadge key={journal.id} journal={journal} />)
    }

    render() {
        return (
            <div className='profile-main'>
                <div className='profile-badge'>
                    <ProfileBadge user={this.props.user} />
                    <Link to={'/Create_Journal'}>
                        <button className='delete-profile'>
                            <FontAwesomeIcon icon={faPlus} />
                            <p>Create Journal</p>
                        </button>
                    </Link>
                </div>
                <div className='jrnls'>
                    {this.loopThroughJournals(this.props.journals)}
                </div>
            </div>
        )
    }
}
