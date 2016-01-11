import React from "react"; //eslint-disable-line
import BaseComponent from "components/_base.js";

let instance;

export class Modal extends BaseComponent {
    constructor() {
        super();
        this._bind("showModal", "hideModal", "onWindowKeypress", "confirm");
        this.state = {modals: []};
    }
    componentDidMount() {
        window.addEventListener("keyup", this.onWindowKeypress);
    }
    componentWillUnmount() {
        window.removeEventListener("keyup", this.onWindowKeypress);
    }
    onWindowKeypress(e) {
        if (e.keyCode === 27) {
            this.hideModal();
        }
    }
    confirm(title, text) {
        return this.showModal(<DialogConfirm title={title} text={text} />, {width: 400, middle: true});
    }
    showModal(component, inOptions) {
        let options = Object.assign({
            id: Math.random(),
            width: 800
        }, inOptions);
        let promise = new Promise((resolve, reject) => {
            // Add modal to list and set state
            this.setState({
                modals: [{
                    id: options.id,
                    options: options,
                    component: React.cloneElement(component, {_options: options, _Promise: {resolve: resolve, reject: reject}})
                }].concat(this.state.modals)
            });
            // Add body class
            document.body.className = "body-modal-active";
        });

        // Catch and finally hide modal
        promise
            .catch((result) => {
                this.hideModal(options.id);
                return result;
            })
            .then((result) => {
                this.hideModal(options.id);
                return result;
            });

        return promise;
    }
    hideModal(id) {
        let modals = this.state.modals;
        if (!modals.length) {
            return;
        }
        modals = modals.filter((modal) => modal.id !== id || (modals[0] && modals[0].id) || null);
        this.setState({modals: modals});
        document.body.className = modals.length ? "body-modal-active" : "";
    }
    renderModal(modal, index) {
        let className = "modal-wrapper" + (!index ? " modal-active" : "") + (modal.options.middle ? " modal-middle" : "");
        let style = {width: modal.options.width};
        return (
            <div className={className} key={modal.id}>
                <div className="modal-blocker"></div>
                <div className="modal-container">
                    <div className="modal" style={style}>{modal.component}</div>
                </div>
            </div>
        );
    }
    render() {
        let modals = this.state.modals.map(this.renderModal);
        return (
            <div className="modals">
                {modals}
            </div>
        );
    }

    static getInstance() {
        if (!instance) {
            instance = React.render(<Modal />, document.getElementById("modal"));
        }
        return instance;
    }

    static confirm(title, text) {
        return Modal.getInstance().showModal(<DialogConfirm title={title} text={text} />, {width: 400, middle: true});
    }

    static showModal(component, options) {
        return Modal.getInstance().showModal(component, options);
    }
}

const DialogConfirm = ({_Promise, title, text}) => (
    <div className="dialog">
        <div className="title">{title}</div>
        <div className="content">
            {text}
        </div>
        <div className="buttons clearfix">
            <div className="right">
                <button className="form-button small text" onClick={() => _Promise && _Promise.resolve()}>Angra</button>
                <button className="form-button small green" onClick={() => _Promise && _Promise.reject()}>OK</button>
            </div>
        </div>
    </div>
);

export default Modal;
