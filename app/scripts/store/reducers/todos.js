import {handleActions} from "redux-actions";
import * as user from "store/constants/user";
import * as todos from "store/constants/todos";

// REDUCER
export default handleActions({
    [todos.ADD_TODO]: (state, action) => {
        return state.concat({
            id: state.reduce((maxId, todo) => Math.max(todo.id, maxId), 0) + 1,
            text: action.payload.text,
            completed: false
        });
    },
    [todos.TOGGLE_TODO]: (state, action) => state.map((todo) =>
        todo.id === action.payload.id ?
        Object.assign({}, todo, {completed: !todo.completed}) :
        todo),
    [todos.REMOVE_TODO]: (state, action) => state.filter((todo) =>
        todo.id !== action.payload.id),
    // Clear todo list when user logs out
    [user.LOGOUT]: () => []
}, []);
