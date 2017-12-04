const moduleName = 'modalControl';

class ModalControl {
    constructor() {
        this._isOpen = false;
        this._modalType = null;
    }

    open(newModalType) {
        angular.element(document.body)
            .css({ overflow: 'hidden' });

        this.type = newModalType;
        this._isOpen = true;
    }

    close() {
        angular.element(document.body)
            .css({ overflow: 'auto' });

        this.type = null;
        this._isOpen = false;
    }

    get isOpen() {
        return this._isOpen;
    }

    get type() {
        return this._isOpen ? this._modalType : null;
    }

    set type(newModalType) {
        this._modalType = newModalType;
    }
}

export default angular.module(moduleName, [])
    .service(moduleName, ModalControl)
    .name;
