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

function userApiLogin() {
    return setTimeoutPromise(500)
        .then(() => {
            return {id: 1, name: "Name of the user"};
        });
}
