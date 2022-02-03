import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import './Login.css'

const Login = (props) => {
    const [redirect, setRedirect] = useState(null);


    const sendCredentials = async (e) => {
        console.log('did i run?')
        e.preventDefault();
        const res = await fetch('http://127.0.0.1:5000/API/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value
            })
        })
        const data = await res.json();
        console.log(data);
        if (data.status === 'success') {
            props.logMeIn(data.data);
            setRedirect('/profile')
        }
    }

    return (
        redirect ? <Navigate to='/profile' /> :
            <>
                <div className='login-container'>
                    <h1>Log In to Start Your Journey</h1>
                    <form className='log-in-forms-container' onSubmit={(e)=>{sendCredentials(e)}}>
                        <div className="log-in-forms form-group">
                            <fieldset>
                                <label htmlFor="E-Mail">E-mail</label>
                                <input className="form-control" id="email" name="email" required="" type="text" />
                            </fieldset>
                            <fieldset className='mt-3'>
                                <label htmlFor="Password">Password</label>
                                <input className="form-control" id="password" name="password" required="" type="password" />
                            </fieldset>
                            <fieldset>
                                <input className="form-check-input mt-4" id="remember_me" name="remember_me" type="checkbox" value="y" />
                                <label className="form-check-label mt-4" htmlFor="remember_me">Remember Me</label>
                            </fieldset>
                            <input className="btn btn-primary mt-4" id="submit" name="submit" type="submit" value="Submit" />
                        </div>
                    </form>
                    <div className="mt-5 text-center">Don't have an account? <Link className="text-decoration-none" to="/Signup">Register</Link></div>
                </div>
               
            </>
    )
}
export default Login