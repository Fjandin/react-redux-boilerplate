import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import createLogger from "redux-logger";
import promiseMiddleware from "redux-promise";

// Import reducers
import {routeReducer} from "redux-simple-router";
import reducerUser from "store/reducers/user";

// Middleware for handling pre actions in meta and lazy payloads
const preMiddleware = ({dispatch, getState}) => (next) => (action) => {
    // Do we have a pre method
    if (action.meta && typeof action.meta.pre === "function") {
        // Pre methods can return false to exit action dispatching
        if (!action.meta.pre(dispatch, getState)) {
            return;
        }
        // Remove pre to prevent from running again
        action.meta.pre = null;
    }

    // If payload is a function execute it and store
    if (typeof action.payload === "function") {
        action.payload = action.payload();
    }

    next(action);
};

// Logger (for config see: https://github.com/fcomb/redux-logger)
const loggerMiddleware = createLogger({collapsed: true});

// Reducers
const reducer = combineReducers({
    routing: routeReducer,
    user: reducerUser
});

// Middlewares
const middleware = [preMiddleware, promiseMiddleware, loggerMiddleware];

const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default (initialState) => {
    // Create store
    return finalCreateStore(reducer, initialState);
};
