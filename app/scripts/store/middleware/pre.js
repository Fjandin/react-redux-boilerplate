// Middleware for handling pre actions in meta and lazy payloads
export default ({dispatch, getState}) => (next) => (action) => {
    // Do we have a pre method
    if (action.meta && typeof action.meta.pre === "function") {
        // Pre methods can return false to exit action dispatching
        if (!action.meta.pre(dispatch, getState, action)) {
            return;
        }
        // Remove pre to prevent from running again
        action.meta.pre = null;
    }

    // If payload is a function execute it and store
    if (typeof action.payload === "function") {
        action.payload = action.payload();
    }

    next(action);
};
