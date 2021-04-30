export const signIn = (credentials) =>{
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase()
        dispatch({type:"LOGGING_IN"})
        firebase.auth().signInWithEmailAndPassword(
            credentials.email,
            credentials.password
        ).then(()=>{
            dispatch({
                type:"LOGIN_SUCCESS"
            })
        }).catch((err) =>{
            dispatch({
                type:"LOGIN_ERROR",
                err
            })
        })

    }
}

export const signOut =()=>{
    return (dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase()
        firebase.auth().signOut().then(()=>{
            dispatch({
                type:"LOGOUT_SUCCESS"
            })
        })
    }
}

export const resetPassword = (email) =>{
    console.log(email)
    return(dispatch, getState, {getFirebase}) =>{
        const firebase = getFirebase();
        dispatch({
            type:"PASSWORD_RESET_PROGRESS"
        });
        firebase.auth().sendPasswordResetEmail(email)
            .then(() =>{
                dispatch({
                    type:"PASSWORD_RESET_EMAIL_SENT_SUCCESS"
                })}).catch((err)=>{
                    dispatch({
                        type:"PASSWORD_RESET_FAILED",
                        err
                    })
        })
    }
}
