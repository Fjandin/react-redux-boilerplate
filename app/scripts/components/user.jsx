import React from "react"; // eslint-disable-line
import {connect} from "react-redux";
import actionsUser from "store/actions/user";

function User({user, login, logout}) {
    if (!user.id) {
        return <div key="component_user">
            <button onClick={login} disabled={user.loading}>{user.loading ? "Logging in..." : "Login"}</button>
        </div>;
    }
    return <div key="component_user">
        id: {user.id}, name: {user.name}
        <button onClick={logout}>Logout</button>
    </div>;
}

export default connect(
    (state) => ({user: state.user}),
    {login: actionsUser.login, logout: actionsUser.logout}
)(User);
