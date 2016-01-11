import React from "react"; // eslint-disable-line

export const Else = () => { throw new Error("Else is not meant for rendering. You might have misplaced an <Else />"); };

export const If = ({children, cond, className, style}) => {
    const elseIndex = Array.isArray(children) ?
        children.findIndex((child) => child && child.type && child.type.name === "Else") :
        -1;

    if (elseIndex > -1) {
        return cond ?
            <div className={className} style={style}>{children.slice(0, elseIndex)}</div> :
            <div className={className} style={style}>{children.slice(elseIndex + 1)}</div>;
    }

    return cond ?
        <div className={className} style={style}>{children}</div> :
        <span style={{display: "none"}} />;
};
