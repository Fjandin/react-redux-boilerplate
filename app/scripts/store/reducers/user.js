import {handleActions} from "redux-actions";
import * as user from "store/constants/user";

// REDUCER
export default handleActions({
    [user.USER_LOGIN_PENDING]: (state) => Object.assign({}, state, {loading: true}),
    [user.USER_LOGIN]: {
        next: (state, action) => action.payload,
        throw: (state, action) => ({id: 0, error: action.payload, meta: {}})
    },
    [user.USER_LOGOUT]: () => ({id: 0, meta: {}})
}, {id: 0, meta: {}});
