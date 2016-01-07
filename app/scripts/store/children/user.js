import {createAction, handleActions} from "redux-actions";

// ACTIONS CONSTANTS
export const USER_LOGIN_PENDING = "USER_LOGIN_PENDING";
export const USER_LOGIN = "USER_LOGIN";
export const USER_LOGOUT = "USER_LOGOUT";

// REDUCER
export const reducer = handleActions({
    [USER_LOGIN_PENDING]: (state) => Object.assign({}, state, {loading: true}),
    [USER_LOGIN]: {
        next: (state, action) => action.payload,
        throw: (state, action) => ({id: 0, error: action.payload, meta: {}})
    },
    [USER_LOGOUT]: () => ({id: 0, meta: {}})
}, {id: 0, meta: {}});

const lazyPromise = (method, ...args) => () => method(...args);

export const actions = {
    login: createAction(USER_LOGIN, (username, password) => lazyPromise(userApiLogin, username, password), () => ({
        pre: (dispatch, getState) => {
            if (getState().user.loading) {
                return false;
            }
            dispatch({type: USER_LOGIN_PENDING});
            return true;
        }
    })),
    logout: createAction(USER_LOGOUT)
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
