import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {applyMiddleware, compose, createStore} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware from "redux-saga"
import {rootSaga} from "./sagas/saga";
import {handleActions} from "redux-actions";
import {defaultState, State} from "./state";
import {actionHandlers} from "./redux";
import "./index.css"

import {XYZ} from "./windowext";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware()

export const reducer = handleActions<State, any>(
    actionHandlers,
    defaultState
);

const store = createStore(
    reducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
)


sagaMiddleware.run(rootSaga)


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);



