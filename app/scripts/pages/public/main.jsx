import React from "react"; // eslint-disable-line
import {push as pushPath} from "react-router-redux";
import {connect} from "react-redux";
import actionsTodos from "store/actions/todos";
import actionsNotify from "store/actions/notify";
import User from "components/user";
import {If, Else} from "components/if";

function PagePublicMain({user, todos, notify, addTodo, toggleTodo, removeTodo, pushPath, addNotification}) {
    return <div>
        <header className="main">
            <h1 style={{display: "inline-block"}}>
                <span className="icon-upload" style={{verticalAlign: 3, color: "orange"}}></span> Main
            </h1>
            <div style={{float: "right"}}>
                <User />
            </div>
        </header>
        <div className="content-body">
            <If cond={user.id}>
                <button onClick={() => addTodo("todo text")} style={{marginBottom: 10}}>Add todo</button>
                <If cond={todos.length}>
                    <ul className="list">
                        {todos.map((todo) =>
                            <li key={todo.id}>
                                <button onClick={() => removeTodo(todo.id)}><span className="icon-upload"></span> Remove</button>
                                <button onClick={() => toggleTodo(todo.id)}>Toggle completed</button>
                                {todo.completed ? " V " : " "}{todo.text}
                            </li>
                        )}
                    </ul>
                <Else />
                    No todo items
                </If>
            <Else />
                You need to be logged in to add todo items
            </If>
            <hr/>
            <button onClick={() => addNotification("Test notification")}>Add notification</button>
            <ul>
                {notify.map((notification) =>
                    <li key={notification.id}>{notification.message}</li>
                )}
            </ul>
            <hr />
            <a onClick={() => pushPath("/")}>Goto home</a>
            <hr />
            <a onClick={() => pushPath("/main")}>Goto main</a>
        </div>
    </div>;
}

export default connect((state) => ({todos: state.todos, user: state.user, notify: state.notify}), {
    pushPath,
    addTodo: actionsTodos.addTodo,
    toggleTodo: actionsTodos.toggleTodo,
    removeTodo: actionsTodos.removeTodo,
    addNotification: actionsNotify.addNotification
})(PagePublicMain);
