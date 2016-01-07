import React from "react"; // eslint-disable-line
import ReactDom from "react-dom";
import {Router} from "react-router";
import {Provider} from "react-redux";
import {createHistory} from "history";
import {syncReduxAndRouter} from "redux-simple-router";
import createStore from "store/store";

// Main layout
import PageWrapper from "pages/wrapper";

// Public pages
import PagePublicMain from "pages/public/main";

const routeConfig = autoHooks([{
    path: "/",
    component: PageWrapper,
    indexRoute: {component: PagePublicMain},
    childRoutes: [
        {path: "/main", component: PagePublicMain}
    ]
}]);

// History
const store = createStore({user: {id: 2, name: "test"}});
const history = createHistory();
syncReduxAndRouter(history, store);

// Start router
exports.start = function start() {
    ReactDom.render(
        <Provider store={store}>
            <Router history={history} routes={routeConfig} />
        </Provider>
    , document.getElementById("app"));
};

// HELPERS
function autoHooks(route) {
    if (Array.isArray(route)) {
        return route.map(autoHooks);
    }
    route.onEnter = route.onEnter || route.component && route.component.onEnter;
    route.onLeave = route.onLeave || route.component && route.component.onLeave;

    if (route.indexRoute) {
        route.indexRoute = autoHooks(route.indexRoute);
    }
    if (route.childRoutes) {
        route.childRoutes = route.childRoutes.map(autoHooks);
    }
    return route;
}
