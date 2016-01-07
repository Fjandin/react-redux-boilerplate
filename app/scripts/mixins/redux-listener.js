export default (reduxStore, callback) => {
    let uid = Math.random().toString();
    return {
        componentDidMount: function componentDidMount() {
            this["__unsubscribe_" + uid] = reduxStore.subscribe(this[callback].bind(this));
        },
        componentWillUnmount: function componentWillUnmount() {
            this["__unsubscribe_" + uid]();
        }
    };
};
