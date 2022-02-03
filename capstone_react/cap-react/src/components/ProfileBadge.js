import React, { Component } from 'react';
import './profileBadge.css'

export default class ProfileBadge extends Component {

    sum = (array) => {
        let count=0;
        for (let i=0;i<array.length;i++) {
            count++
        };
        return count
    }

    render() {
        const user = this.props.user
        const vs = this.props.user.visited
        return (
            <>
                <div className='badge-component col-8'>
                    <h1>{user.first} {user.last}</h1>
                    <h5>You have visited {this.sum(vs)}/50 states!</h5>
                </div>
            </>
        )
    }
}
