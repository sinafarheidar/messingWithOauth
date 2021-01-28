import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from './components/Nav';

import Signup from './components/Signup'
import Signin from './components/Signin'
import Home from './components/Home'
import Private from './components/Private'
import Admin from './components/Admin'

import PrivateRoute from './components/auth/PrivateRoute'
import AdminRoute from './components/auth/AdminRoute'

function App() {
  return (
    <Router>
      <div className="container">
        <Nav></Nav>
        <br></br>
        <Switch>
        <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/signin' component={Signin} />
          <PrivateRoute exact path='/private' component={Private} />
          <AdminRoute exact path='/admin' component={Admin} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
