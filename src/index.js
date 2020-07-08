import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {applyMiddleware, createStore, compose} from "redux";
import {Provider} from 'react-redux';
import thunk from 'redux-thunk'
import rootReducer from "./store/reducers/rootReducer";
import App from "./App";

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const application = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(application, document.getElementById('root'));
serviceWorker.unregister();
