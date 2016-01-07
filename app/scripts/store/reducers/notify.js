import {handleActions} from "redux-actions";
import * as user from "store/constants/user";
import * as notify from "store/constants/notify";
import {store} from "app/app";
import actionsNotify from "store/actions/notify";

// Add notification
const addNotification = (state, id, message) => state.concat({id, message});

// REDUCER
export default handleActions({
    [notify.ADD_NOTIFICATION]: (state, action) =>
        addNotification(state, action.payload.id, action.payload.message),

    [notify.DISMISS_NOTIFICATION]: (state, action) =>
        state.filter((notification) =>
            notification.id !== action.payload.id),

    [user.LOGIN]: {
        next: (state) => {
            setTimeout(() => store.dispatch(actionsNotify.addNotification("You are now logged in")));
            return state;
        },
        throw: (state, action) => {
            setTimeout(() => store.dispatch(actionsNotify.addNotification(action.payload.message)));
            return state;
        }
    },
    [user.LOGOUT]: (state) => {
        setTimeout(() => store.dispatch(actionsNotify.addNotification("You are now logged out")));
        return state;
    }
}, []);
