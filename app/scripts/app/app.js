// Styles
import "styles/app";

// Polyfills
import "babel-polyfill";

// Router and store
import createStore from "store/store";
import router from "app/router";

// Create store
export const store = createStore();

// Init app
router(store);
