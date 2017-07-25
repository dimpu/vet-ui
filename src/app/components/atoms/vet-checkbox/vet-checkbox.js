import templateUrl from './vet-checkbox.html';

const moduleName = 'vetCheckbox';

const vetCheckbox = {
    bindings:{
        label: '@',
        model: '<',
        isDisabled: '<',
        onUpdate: '&'
    },
    templateUrl,
    controller: [vetCheckboxCtrl]
};

function vetCheckboxCtrl() {
    const ctrl = this;

    ctrl.onClick = () => {
        if (!ctrl.isDisabled || ctrl.model){
            ctrl.model = !ctrl.model;
            ctrl.onUpdate({ value: ctrl.model });
        }
    };
}

export default angular.module(moduleName, [])
    .component(moduleName, vetCheckbox)
    .name;
