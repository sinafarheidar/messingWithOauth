import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

import { isAuth } from './helpers'

function Signup() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const updateName = (e) => {
        setName(e.target.value)
    }

    const updateEmail = (e) => {
        setEmail(e.target.value)
    }

    const updatePassword = (e) => {
        setPassword(e.target.value)
    }

    const createUser = (e) => {
        e.preventDefault()
        const user = {
            name: name,
            email: email,
            password: password
        }

        axios.post('http://localhost:5000/api/signup', user)
        .then(res => {
            console.log("Success: " + JSON.stringify(res.data.message))
            toast.success(res.data.message)
        })
        .catch(err => {
            console.log('Error: ' + err.response.data.error)
            toast.error(err.response.data.error)
        })
    }
    return (

        <div>
 <ToastContainer />
 {isAuth() ? <Redirect to='/' /> : null}
<div className="alert alert-dark" role="alert">
  <h4 className="alert-heading">Sign Up!</h4>
  <p>Welcome to the site! Thanks for visiting, you can get started by creating an account here. If you already have one, you can sign in <Link to='/signin'>Here</Link></p>
  <hr/>
  <form onSubmit={createUser}>
  <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Name:</span>
                        <input onChange={updateName} type="text" className="form-control" placeholder="Almost There!" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>
            </div>

            <br/>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Email:</span>
                        <input onChange={updateEmail} type="text" className="form-control" placeholder="Email@gmail.com" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>
                </div>
            <br/>

            <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping">Password:</span>
                        <input onChange={updatePassword} type="text" className="form-control" placeholder="Must be at least 6 characters long" aria-label="Username" aria-describedby="addon-wrapping" />
                    </div>
                </div>

                <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                <button type="submit" className="btn btn-dark">Sign Up!</button>
                </div>
            </div>
            </form>
        </div>
</div>
    )
}

export default Signup
