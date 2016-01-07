import React from "react"; // eslint-disable-line
import {pushPath} from "redux-simple-router";
import {connect} from "react-redux";
import actionsTodos from "store/actions/todos";
import actionsNotify from "store/actions/notify";
import User from "components/user";

function PagePublicMain({user, todos, notify, addTodo, toggleTodo, removeTodo, pushPath, addNotification}) {
    let addTodoButton;
    if (user.id) {
        addTodoButton = <button onClick={() => addTodo("todo text")}>Add todo</button>;
    }
    return <div>
        <h1>Main</h1>
        <User />
        <hr />
        {addTodoButton}
        <ul>
            {todos.map((todo) =>
                <li key={todo.id}>
                    <button onClick={() => removeTodo(todo.id)}>Remove</button>
                    <button onClick={() => toggleTodo(todo.id)}>Toggle completed</button>
                    {todo.completed ? "V " : ""}{todo.text}
                </li>
            )}
        </ul>
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
    </div>;
}

export default connect((state) => ({todos: state.todos, user: state.user, notify: state.notify}), {
    pushPath,
    addTodo: actionsTodos.addTodo,
    toggleTodo: actionsTodos.toggleTodo,
    removeTodo: actionsTodos.removeTodo,
    addNotification: actionsNotify.addNotification
})(PagePublicMain);
