// Styles
import "styles/app";

// Polyfills
import "babel-polyfill";

// Router and store
import createStore from "store/store";
import router from "app/router";

// Try to get state from localStorage
let initialState;
try {
    initialState = JSON.parse(window.localStorage.getItem("app-state"));
} catch (e) { /* no local storage */ }

// Make sure state is an object
initialState = initialState === null || typeof initialState !== "object" ? {} : initialState;

// TODO: Check if we have a valid user token (if not discard state)

// Create store
export const store = createStore(initialState);

// Store selected states on change
const onStoreChange = () => {
    let currentState = store.getState();
    let storeState = {
        user: currentState.user,
        todos: currentState.todos
    };
    window.localStorage.setItem("app-state", JSON.stringify(storeState));
};

store.subscribe(onStoreChange);

// Init app
router(store);
