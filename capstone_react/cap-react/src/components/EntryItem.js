import React, { Component } from 'react';
import './item.css'

export default class EntryItem extends Component {
  render() {
    return (
      <div className=' item d-flex flex-column align-items-center'>
        <h4 className='item-header'>{this.props.entry.title}</h4>
        <p className='item-subline'>{this.props.entry.date}</p>
      </div>
    )
  }
}
