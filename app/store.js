import { createStore, applyMiddleware, compose } from 'redux';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers';

let middleware;
let initialState = {
    weather: {
        data: {},
        loaded: false
    },
    weatherCities: {
        weatherList: []
    }
};

if (process && process.env && (process.env.NODE_ENV === 'production')) {
    middleware = applyMiddleware(thunk, promise);
} else {
    middleware = applyMiddleware(thunk, promise, logger);
}

// Adding redux tools
export default createStore(
    rootReducer, 
    initialState, 
    compose(
        middleware, 
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    
);

