import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JournalBadge from '../components/JournalBadge';
import ProfileBadge from '../components/ProfileBadge';

export default class Profile extends Component {


    loopThroughJournals = (journalslist) => {
        return journalslist.map(journal => <JournalBadge key={journal.id} journal={journal} />)
    }

    render() {
        return (
            <>
                <div>
                    <ProfileBadge user={this.props.user} />
                <Link to={'/Create_Journal'}><h6>Create New Journal</h6></Link>
                </div>
                <div>
                    {this.loopThroughJournals(this.props.journals)}
                </div>
            </>
        )
    }
}
