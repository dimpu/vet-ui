'use strict';
import templateUrl from './vet-toggle-switch.html'

const moduleName = 'vetToggleSwitch';

function vetToggleSwitchController($timeout) {
    let ctrl = this;

    ctrl.change = change;

    ctrl.$onInit = function() {
    };

    function change () {
        let val = ctrl.ngModel;
        $timeout(() => ctrl.onChange({val: val}));
    }

}

let vetToggleSwitch = {
    bindings: {
        label: "@",
        ngModel: '=',
        onChange: '&'
    },
    transclude: true,
    templateUrl,
    controller: ['$timeout', vetToggleSwitchController]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetToggleSwitch)
    .name;
