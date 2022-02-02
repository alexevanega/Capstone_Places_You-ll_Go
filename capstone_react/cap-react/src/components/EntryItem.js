import React, { Component } from 'react';

export default class EntryItem extends Component {
  render() {
    return (<li>{this.props.entry.title}, {this.props.entry.date}</li>)
  }
}
