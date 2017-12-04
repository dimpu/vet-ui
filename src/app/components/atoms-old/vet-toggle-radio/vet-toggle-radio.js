import templateUrl from './vet-toggle-radio.html'

const moduleName = 'vetToggleRadio';

function vetToggleRadioController() {
    'use strict';

    let ctrl = this;

    ctrl.change = () => {
        let val = ctrl.ngModel;
        ctrl.onChange({val: val});
    };
}

let vetToggleRadio = {
    bindings: {
        value : "@",
        label : "@",
        ngModel: '=',
        onChange: '&'
    },
    transclude: true,
    templateUrl,
    controller: [vetToggleRadioController]
};


export default angular.module(moduleName, [])
    .component(moduleName, vetToggleRadio)
    .name;
