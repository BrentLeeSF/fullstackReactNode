import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { Washington } from './reducers/washingtonReducer.js';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            washington: Washington,
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
};