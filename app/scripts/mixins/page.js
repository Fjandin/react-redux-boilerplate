import React from "react"; // eslint-disable-line
import store from "store/store";

export const mixinPagePublic = {};

export const mixinPageUser = {
    componentDidMount: function componentDidMount() {
        this.__unsubscribe_page = store.subscribe(this.__onStoreChange.bind(this));
    },
    componentWillUnmount: function componentWillUnmount() {
        this.__unsubscribe_page && this.__unsubscribe_page();
    },
    __onStoreChange: function __onUserStoreChange() {
        let storeState = store.getState();
        if (!storeState.user.id) {
            this.history.replaceState(null, "/login");
        }
    },
    statics: {
        onEnter: (nextState, replaceState) => {
            if (!store.getState().user.id) {
                replaceState(null, "/login");
            }
        }
    }
};
