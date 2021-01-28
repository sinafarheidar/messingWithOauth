import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import Google from './Google'
import { authenticateUser, isAuth } from './helpers'

function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const createUser = (e) => {
        e.preventDefault()
        const user = {
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/api/signin', user)
            .then(res => {

                // Save Token to Cookies and User to Local Storage
                authenticateUser(res, () => {
                    console.log("Success: " + JSON.stringify(res.data))
                    toast.success(`Welcome back ${res.data.user.name}!`)
                    window.location.href = '/'
                })

            })
            .catch(err => {
                console.log('Error: ' + err.response.data.error)
                toast.error(err.response.data.error)
            })
    }

    const informParent = (res) => (
        authenticateUser(res, () => {
            console.log(res)
            window.location.href = '/'
        })
    )
    

    return (
        <div>
            <ToastContainer />

            {/* If User Information is Available Redirect to '/' */}
            {isAuth() ? <Redirect to='/' /> : null}
            <div className="alert alert-dark" role="alert">
                <h4 className="alert-heading">Sign In!</h4>
                <p>Welcome back to the site! Thanks for visiting, you can get started by signing in. If you are new you can register <Link to='/signin'>Here</Link></p>
                <hr />
                <form onSubmit={createUser}>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">Email:</span>
                                <input onChange={updateEmail} type="text" className="form-control" placeholder="Email@gmail.com" aria-label="Username" aria-describedby="addon-wrapping" />
                            </div>
                        </div>
                    </div>


                    <br />

                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="input-group flex-nowrap">
                                <span className="input-group-text" id="addon-wrapping">Password:</span>
                                <input onChange={updatePassword} type="password" className="form-control" placeholder="Must be at least 6 characters long" aria-label="Username" aria-describedby="addon-wrapping" />
                            </div>
                        </div>


                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <button type="submit" className="btn btn-dark">Sign In!</button>

                        </div>

                    </div>

                    <br />

                </form>


                <h4 className="alert-heading" style={{ display: 'flex', justifyContent: 'center' }}>Or</h4>

                <br />

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Google informParent={informParent}/>
                </div>
            </div>
        </div>
    )
}

export default Signin
