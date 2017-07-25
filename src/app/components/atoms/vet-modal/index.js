import modalControl from './modal-control.js';
import templateUrl from './vet-modal.html';

const moduleName = 'vetModal';

const vetModal = {
    bindings: {
        onClose: '&',
    },
    transclude: true,
    templateUrl,
    controller: ['modalControl', vetModalController]
};

function vetModalController(modalControl) {
    const ctrl = this;

    ctrl.modalControl = modalControl;
    ctrl.handleClose = handleClose;

    function handleClose() {
        ctrl.onClose();
        ctrl.modalControl.close();
    }
}

export default angular.module(moduleName, [modalControl])
    .component(moduleName, vetModal)
    .name;
