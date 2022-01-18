import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-primary bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/">The Places You'll Go!</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">What We Do</Link>
                                </li>


                                {
                                    this.props.isLoggedIn ? (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Map">View Your Map</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to="/plan">Plan Your Next Trip</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/profile">Your Profile Page</Link>
                                            </li>
                                            <li className="nav-item">
                                                <button className="nav-link btn btn-link" onClick={() => { this.props.logMeOut() }} >Log Out</button>
                                            </li>
                                            <li className="nav-item">
                                                <p className="nav-link" >Hello, {this.props.currentUser.first}</p>
                                            </li>
                                        </>
                                    ) : (
                                        <>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Map">The Map</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link active" aria-current="page" to="/plan">Where Will You Go?</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/login">Log In</Link>
                                            </li>
                                            <li className="nav-item">
                                                <Link className="nav-link" to="/Signup">Register</Link>
                                            </li>
                                        </>
                                    )
                                }



                            </ul>
                            <form className="d-flex">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                    </div>
                </nav>
            </div>
        )
    }
}