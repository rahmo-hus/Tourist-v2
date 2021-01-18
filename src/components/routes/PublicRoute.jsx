import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PublicRoute({component: Component, auth, ...other}){
    return(
        <Route 
        {...other}
        render={(props)=>{
           return !auth.uid ? <Component {...props} /> : <Redirect to='/dashboard' />
        }} />
    )
}

const mapStateToProps = (state) =>{
    return {
        auth:state.firebase.auth
    }
}

export default connect(mapStateToProps)(PublicRoute)