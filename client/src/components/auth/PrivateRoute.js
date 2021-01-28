import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers'

// If there is user info allow them to see the compnent, otherwise send them to /signin
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={
        props => isAuth() ? <Component {...props} /> : <Redirect to='/signin' />
    }>

    </Route>
)

export default PrivateRoute
