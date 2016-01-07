import {createAction} from "redux-actions";
import * as notify from "store/constants/notify";

let dismissNotification = createAction(notify.DISMISS_NOTIFICATION, (id) => ({id}));
let addNotification = createAction(notify.ADD_NOTIFICATION, (message) => ({id: Date.now(), message}), () => ({
    pre: (dispatch, getState, action) => {
        setTimeout(() => dispatch(dismissNotification(action.payload.id)), 5000);
        return true;
    }
}));

let pushNotification = (message) => (dispatch) => {
    dispatch(addNotification(message));
};

export default {
    addNotification: addNotification,
    dismissNotification: dismissNotification,
    pushNotification: pushNotification
};
