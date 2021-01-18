import React from 'react'
import {connect} from 'react-redux'
import {Redirect, Route} from 'react-router-dom'

function PrivateRoute({component: Component,auth,...other}){
    return(
        <Route 
        {...other}
        render={props =>{
            return auth.uid ? <Component {...props} /> : <Redirect to='/login' />
        }}>
        </Route>
    )
}


const mapStateToProps = (state) => {
    return{
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps)(PrivateRoute)