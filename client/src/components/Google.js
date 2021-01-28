import React from 'react'
import GoogleLogin from 'react-google-login';
import axios from 'axios';

function Google(props) {

    const googleResponse = (res) => {
        console.log('Starting Call')
        axios.post('http://localhost:5000/api/google-login', {idToken: res.tokenId})
        .then(response => (
            // Inform Parent Component
            props.informParent(response)
        ))
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <GoogleLogin
                        clientId="930536793342-0f8mnfpur38plu17lksqfk40m7g8vdh8.apps.googleusercontent.com"
                        buttonText="Login With Google"
                        onSuccess={googleResponse}
                        onFailure={googleResponse}
                        cookiePolicy={'single_host_origin'}
                    />
        </div>
    )
}

export default Google
