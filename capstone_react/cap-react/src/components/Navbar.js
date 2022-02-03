import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { faHome, faFlagUsa, faPlaneDeparture, faIdCard, faUser, faUserAltSlash, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/Nav.css'

export default class Navbar extends Component {
    render() {
        return (
            <div className='the-bar'>
                <nav className="navbar navbar-expand-lg navbar-light" style={{ background: '#e3f2fd' }}>
                    <div className="container-fluid">
                        <h1 className="navbar-brand" href="/">The Places You'll Go!</h1>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav d-flex align-items-baseline m-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">
                                        <FontAwesomeIcon icon={faHome} size='3x' />
                                    </Link>
                                </li>

                                {
                                    this.props.isLoggedIn ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Map">
                                                    <FontAwesomeIcon icon={faFlagUsa} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/plan">
                                                    <FontAwesomeIcon icon={faPlaneDeparture} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/profile">
                                                    <FontAwesomeIcon icon={faIdCard} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link to='/'><button className="nav-link btn btn-link" onClick={() => { this.props.logMeOut() }} >
                                                    <FontAwesomeIcon icon={faUserAltSlash} size='3x' />
                                                </button></Link>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Map">
                                                    <FontAwesomeIcon icon={faFlagUsa} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to="/plan">
                                                    <FontAwesomeIcon icon={faPlaneDeparture} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">
                                                    <FontAwesomeIcon icon={faUser} size='3x' />
                                                </Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Signup">
                                                    <FontAwesomeIcon icon={faUserPlus} size='3x' />
                                                </Link>
                                            </li>
                                        </>
                                    )
                                }

                            </ul>
                            {this.props.isLoggedIn ? (
                                <h4 className="name nav-item" >Hello, {this.props.currentUser.first}</h4>
                            ):(
                                <h4 className='name nav-item' >Your Journey Awaits</h4>
                            )}
                            
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}