import React, { Component } from 'react';
import '../css/singlepic.css';

export default class Pic extends Component {

    constructor() {
        super();
        this.state = {
            img: null
        }
    }

    getPic = async () => {
        const pic = this.props.pic;
        const journal = this.props.journal;
        const user = this.props.user.id;
        const album = this.props.album;
        fetch(`http://127.0.0.1:5000/API/pics/get_individual_image/${user}/${journal}/${album}/${pic}`)
            .then(response => response.blob())
            .then(picBlob => {
                const picObjectURL = URL.createObjectURL(picBlob);
                this.setState({ img: picObjectURL })
            })
    }

    componentDidMount() {
        if (this.props.single !== true) {
            this.getPic()
        }
    }

    render() {
        return (
            this.props.single ?
                (
                    <div className='pic'>
                        <span><button id='close' type="button" className="btn-close" aria-label="Close"></button></span>
                        <img className='model-content img-fluid' id='singlepic' src={this.props.pic} onLoad={() => { URL.revokeObjectURL(this.src) }} alt={this.props.pic} />
                    </div>
                ) : (
                    <div className='picCard'>
                        <img id='pic' src={this.state.img} width={250} onClick={(e) => this.props.showPic(e, this.state.img)} height={250} onLoad={() => { URL.revokeObjectURL(this.src) }} alt={this.props.pic} />
                    </div>
                )

        )
    }
}