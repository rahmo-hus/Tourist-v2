import taskReducer from './taskReducer'
import authReducer from './authReducer'
import {firebaseReducer} from 'react-redux-firebase' 
import {firestoreReducer} from 'redux-firestore'
import {combineReducers} from 'redux'

const rootReducer = combineReducers({
    quest: taskReducer,
    auth:authReducer,
    firestore: firestoreReducer,
    firebase:firebaseReducer
})

export default rootReducer