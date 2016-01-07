import React from "react"; // eslint-disable-line
import {pushPath} from "redux-simple-router";
import {connect} from "react-redux";

import User from "components/user";

function Page({pushPath}) {
    return <div>
        <h1>Main</h1>
        <User />
        <hr />
        <a onClick={() => pushPath("/")}>Goto home</a>
        <hr />
        <a onClick={() => pushPath("/main")}>Goto main</a>
    </div>;
}

export default connect(null, {pushPath})(Page);
