import React from 'react'
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'
import Login from './components/auth/Login'
import PrivateRoute from './components/routes/PrivateRoute'
import PublicRoute from  './components/routes/PublicRoute'
import ForgotPassword from './components/auth/ForgotPassword';
import {Typography} from "@material-ui/core";
import Link from "@material-ui/core/Link";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <PrivateRoute path = '/dashboard'  component={Dashboard} />
                    <PublicRoute path = '/login' component={Login} />
                    <PublicRoute path ='/forgot-password' component={ForgotPassword} />
                    <PublicRoute path='*' render={()=>(
                        <div>
                            <Typography variant="h4" component="h3">Stranica ne postoji</Typography>
                            <Link href="/login" variant="body2">Početna stranica</Link>
                        </div>)
                    }/>
                </Switch>
            </Router>
        </div>
    )
}

export default App;
