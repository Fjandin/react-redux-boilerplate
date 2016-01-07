import React from "react";
import store from "store/store";

import classMixins from "mixins/class-mixins";
import mixinBaseComponent from "mixins/component";
import mixinReduxListener from "mixins/redux-listener";
import {mixinPagePublic} from "mixins/page";

export default class PagePublicMain extends React.Component {
    constructor() {
        super();
        this._bind();
        this.state = {
            user: store.getState().user
        };
    }
    onStoreChange() {
        let user = store.getState().user;
        if (user === this.state.user) {
            return false;
        }
        this.setState({user});
    }
    render() {
        let button;
        if (this.state.user.id) {
            button = <button onClick={store.actions.user.logout}>Logout</button>;
        } else {
            button = <button onClick={store.actions.user.login.bind(null, "r", "b")}>Login</button>;
        }
        return <div>
            <h1>id: {this.state.user.id}, name: {this.state.user.name}</h1>
            {button}
        </div>;
    }
}

classMixins(PagePublicMain, mixinBaseComponent, mixinPagePublic, mixinReduxListener(store, "onStoreChange"));
