import React from 'react'
import { Link } from 'react-router-dom'
import { isAuth } from './helpers';

function Home() {
    return (
        <div>
            <h1>Hello</h1>
            {isAuth() ? <h1>Welcome Home</h1> :
            <div>
            <Link to='/signup'>Sign Up</Link>
            <br></br>
            <Link to='/signin'>Sign In</Link>
            </div>
            }
        </div>
    )
}

export default Home
