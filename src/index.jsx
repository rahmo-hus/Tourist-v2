import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import firebaseConf from "./config/fbConfig";
import firebase from "firebase/app";
import { makeStyles } from '@material-ui/core/styles';
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import {
  getFirebase,
  isLoaded,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),

        },
    position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)"
    }
}));

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore})),
    reduxFirestore(firebaseConf)
  )
);

const rrfProps = {
  firebase,
  config: firebaseConf,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

const rootElement = document.getElementById("root");

function AuthIsLoaded({ children }) {
  const auth = useSelector((state) => state.firebase.auth);
  const classes = useStyles();
  if (!isLoaded(auth))
    return (
        <div className={classes.root}>
            <CircularProgress/>
        </div>
    );
  return children;
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <AuthIsLoaded>
          <App />
      </AuthIsLoaded>
    </ReactReduxFirebaseProvider>
  </Provider>,
  rootElement
);
