import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import {
    adminReducer,
    adminSaga,
    createAppReducer,
    defaultI18nProvider,
    i18nReducer,
    formMiddleware,
    USER_LOGOUT,
} from 'ra-core';

import extraReducer from './reducers/nativeReducer';
import actualityEffect from "./sideEffects/actualityEffect";

export default ({
    authProvider,
    dataProvider,
    i18nProvider,
    history,
    locale = 'ru',
}) => {
    const reducer = combineReducers({
        admin: adminReducer,
        i18n: i18nReducer(locale, i18nProvider(locale)),
        form: formReducer,
        router: routerReducer,
        native: extraReducer,
    });
    const resettableAppReducer = (state, action) =>
        reducer(action.type !== USER_LOGOUT ? state : undefined, action);

    const saga = function* rootSaga() {
        yield all(
            [
                adminSaga(dataProvider, authProvider, i18nProvider),
                // add your own sagas here
                actualityEffect,
            ].map(fork)
        );
    };
    const sagaMiddleware = createSagaMiddleware();

    const store = createStore(
        resettableAppReducer,
        {
            /* set your initial state here */
            //native: {actualDate:'-'}
        },
        compose(
            applyMiddleware(
                sagaMiddleware,
                formMiddleware,
                routerMiddleware(history)
                // add your own middlewares here
            ),
            typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__
                ? window.__REDUX_DEVTOOLS_EXTENSION__()
                : f => f
            // add your own enhancers here
        )
    );
    sagaMiddleware.run(saga);
    return store;
};
