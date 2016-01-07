import {createAction} from "redux-actions";
import * as user from "store/constants/user";

// HELPERS
const lazyPromise = (method, ...args) => () => method(...args);

export default {
    login: createAction(user.LOGIN, (username, password) => lazyPromise(userApiLogin, username, password), () => ({
        pre: (dispatch, getState) => {
            if (getState().user.loading) {
                return false;
            }
            dispatch({type: user.LOGIN_PENDING});
            return true;
        }
    })),
    logout: createAction(user.LOGOUT)
};

// TEMP MOCKS //
const setTimeoutPromise = (interval) => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), interval);
    });
};

function userApiLogin(username, password) {
    return setTimeoutPromise(500)
        .then(() => {
            if (username === "user" && password === "demo") {
                return {id: 1, name: username};
            }
            return Promise.reject({error: true, message: "Username and/or password incorrect."});
        });
}
