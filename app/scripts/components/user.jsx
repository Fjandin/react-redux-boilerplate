import React from "react"; // eslint-disable-line
import {connect} from "react-redux";
import actionsUser from "store/actions/user";
import {If, Else} from "components/if";

function User({user, login, logout}) {
    return (
        <If cond={user.id}>
            id: {user.id}, name: {user.name}
            <button onClick={logout}>Logout</button>
        <Else />
            <button onClick={() => login("user", "demo")} disabled={user.loading}>{user.loading ? "Logging in..." : "Login"}</button>
        </If>
    );
}

export default connect(
    (state) => ({user: state.user}),
    {login: actionsUser.login, logout: actionsUser.logout}
)(User);
