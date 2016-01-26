import {combineReducers, createStore, applyMiddleware, compose} from "redux";
import createLogger from "redux-logger";
import promiseMiddleware from "redux-promise";

// Import middleware
import preMiddleware from "store/middleware/pre";

// Import reducers
import reducerUser from "store/reducers/user";
import reducerTodos from "store/reducers/todos";
import reducerNotify from "store/reducers/notify";

import {browserHistory} from "react-router";
import {syncHistory, routeReducer} from "react-router-redux";

// Logger (for config see: https://github.com/fcomb/redux-logger)
const loggerMiddleware = createLogger({collapsed: true});

// Reducers
const reducer = combineReducers({
    routing: routeReducer,
    user: reducerUser,
    todos: reducerTodos,
    notify: reducerNotify
});

// history / router middleware
const routerMiddleware = syncHistory(browserHistory);

// Middlewares
const middleware = [routerMiddleware, preMiddleware, promiseMiddleware, loggerMiddleware];

const finalCreateStore = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)(createStore);

export default (initialState) => {
    // Create store
    return finalCreateStore(reducer, initialState);
};
