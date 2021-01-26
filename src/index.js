import React from "react";
import ReactDOM from "react-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import App from "./App";
import theme from "./theme";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider, useSelector } from "react-redux";
import thunk from "redux-thunk";
import firebaseConf from "./config/fbConfig";
import firebase from "firebase/app";
import {
  getFirestore,
  reduxFirestore,
  createFirestoreInstance,
} from "redux-firestore";
import {
  getFirebase,
  isLoaded,
  useFirebase,
  ReactReduxFirebaseProvider,
} from "react-redux-firebase";
import { reactReduxFirebase } from "react-redux-firebase";
import { CircularProgress } from "@material-ui/core";

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
  if (!isLoaded(auth))
    return (
      <CircularProgress
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />
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
