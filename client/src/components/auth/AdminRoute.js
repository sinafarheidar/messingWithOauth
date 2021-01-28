import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from '../helpers'

// If there is user info allow them to see the compnent, otherwise send them to /signin
const AdminRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={
        props => isAuth() && isAuth().role === 'admin' ? <Component {...props} /> : <Redirect to='/signin' />
    }>

    </Route>
)

export default AdminRoute
