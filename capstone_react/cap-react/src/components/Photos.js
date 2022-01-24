import React, { Component } from 'react';

export default class Photos extends Component {


  constructor() {
      super()
      this.state = {
          albums: [],
      }
  }

  getAlbums = async () => {
    const user = this.props.user;
    const res = await fetch(`http://127.0.0.1:5000/API/getalbums/${user}`);
    const data = await res.json();
    this.setState({ albums: data })
}


  componentDidMount() {
    this.getAlbums()
}

  render() {
    console.log(this.state.albums)
    return (
    <div>
      
    </div>
    );
  }
}
