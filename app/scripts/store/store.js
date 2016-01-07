import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import createLogger from "redux-logger";
import promiseMiddleware from "redux-promise";
import reduceReducers from "reduce-reducers";

// Import reducers
import {reducer as reducerUser, actions as actionsUser} from "store/children/user";

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
    user: reducerUser
});

// Middlewares
const middleware = [preMiddleware, promiseMiddleware, loggerMiddleware];

const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

const initializeStore = (initialState) => {
    // Create store
    const store = finalCreateStore(reducer, initialState);

    // Add action creators to store
    store.actions = {
        user: actionsUser
    };
    // Auto-dispatches result from an action creator
    const autoDispatch = (createAction) => (...args) => store.dispatch(createAction(...args));

    // Apply auto-dispatch on action creators
    for (let name in store.actions) {
        if (!store.actions.hasOwnProperty(name)) {continue; }
        for (let action in store.actions[name]) {
            if (!store.actions[name].hasOwnProperty(action)) {continue; }
            store.actions[name][action] = autoDispatch(store.actions[name][action]);
        }
    }

    return store;
};

export default initializeStore({});
