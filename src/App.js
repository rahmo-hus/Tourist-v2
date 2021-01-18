import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import {connect} from 'react-redux'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from  './components/routes/PublicRoute'

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <PrivateRoute path = '/dashboard'  component={Dashboard} />
                    <PublicRoute path = '/login' component={Login} />
                    <PrivateRoute path='*' component={Dashboard} />
                </Switch>
            </Router>
        </div>
    )
}

export default App;
