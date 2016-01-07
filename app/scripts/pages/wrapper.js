import React from "react";

export default class PageWrapper extends React.Component {
    render() {
        return <div>{this.props.children}</div>;
    }
}
