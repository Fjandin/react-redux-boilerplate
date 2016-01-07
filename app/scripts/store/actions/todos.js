import {createAction} from "redux-actions";
import * as todos from "store/constants/todos";

export default {
    addTodo: createAction(todos.ADD_TODO, (text) => ({text})),
    toggleTodo: createAction(todos.TOGGLE_TODO, (id) => ({id})),
    removeTodo: createAction(todos.REMOVE_TODO, (id) => ({id}))
};
