import React from "react"; // eslint-disable-line
import ReactDom from "react-dom";
import {Router, browserHistory} from "react-router";
import {Provider} from "react-redux";

// Main layout
import PageWrapper from "pages/wrapper";

// Public pages
import PagePublicMain from "pages/public/main";

const routeConfig = {
    path: "/",
    component: PageWrapper,
    indexRoute: {component: PagePublicMain},
    childRoutes: [
        {path: "/main", component: PagePublicMain},
        {path: "/main2", component: PagePublicMain, onEnter: (getState, replaceState) => {
            replaceState("/main");
        }}
    ]
};

// Start router
export default function start(store) {
    ReactDom.render(
        <Provider store={store}>
            <Router history={browserHistory} routes={autoHooks(store, [routeConfig])} />
        </Provider>
    , document.getElementById("app"));
}


// HELPERS
function autoHooks(store, route) {
    if (Array.isArray(route)) {
        return route.map(autoHooks.bind(null, store));
    }
    route._onEnter = route.onEnter || route.component && route.component.onEnter;
    route._onLeave = route.onLeave || route.component && route.component.onLeave;

    if (route._onEnter) {
        route.onEnter = (nextState, replace) => {
            return route._onEnter(store.getState, (path) => replace(path));
        };
    }

    if (route.indexRoute) {
        route.indexRoute = autoHooks(store, route.indexRoute);
    }
    if (route.childRoutes) {
        route.childRoutes = route.childRoutes.map(autoHooks.bind(null, store));
    }
    return route;
}
