import React, { Component } from 'react';
import { Link, Navigate } from 'react-router-dom';

export default class Register extends Component {
    constructor(){
        super();
        this.state = {
            redirect: null
        }
    }

    sendCredentials = async (e) => {
        console.log('did i run?')
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/API/register', {
            method: "POST",
            headers: {
                'Content-Type': "application/json",
            },
            body: JSON.stringify({
                first: e.target.firstname.value,
                last: e.target.lastname.value,
                email: e.target.email.value,
                password: e.target.password.value,
                confirmPassword: e.target.confirm_password.value
            })
        })
        const data = await res.json();
        console.log(data);
        if (data.status === 'success'){
            return this.setState({redirect: '/login'});
        }
    }

    render() {
        return (
            this.state.redirect ? <Navigate to='/login' />:
            <>
            <div className='container'>
                <form onSubmit={(e)=>{this.sendCredentials(e)}}>
                    <div className="form-group">
                        <fieldset>
                            <label htmlFor="First Name">First Name</label>
                            <input className="form-control" id="firstname" name="firstname" placeholder="First Name" required="" type="text" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="Last Name">Last Name</label>
                            <input className="form-control" id="lastname" name="lastname" placeholder="Last Name" required="" type="text" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="E-mail">Email</label>
                            <input className="form-control" id="email" name="email" placeholder="Email" required="" type="email" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="Password">Password</label>
                            <input className="form-control" id="password" name="password" placeholder="Password" required="" type="password" />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="confirm_password">Confirm Password</label>
                            <input className="form-control" id="confirm_password" name="confirm_password" placeholder="Confirm Password" required="" type="password" />
                        </fieldset>
                        <br/>
                        <input className="btn btn-primary" id="submit" name="submit" type="submit" value="Submit" />
                    </div>
                </form>
            </div>
            <div className="mt-2 text-center">Already have an account? <Link className="text-decoration-none" to="/login">Login</Link></div>
            </>
        )
    }
}