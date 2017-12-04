import percent from '../directives/percent';
import ignoreLast from '../directives/ignore-last';
import templateUrl from './vet-percentage-input.html';

const moduleName = 'vetPercentageInput';

const vetPercentageInput = {
    bindings: {
        model: '<',
        placeholder: '@',
        label: '@',
        onUpdate: '&'
    },
    templateUrl,
    controller: [vetPercentageInputCtrl]
};

function vetPercentageInputCtrl() {
    const ctrl = this;

    ctrl.handleUpdate = () => {
        ctrl.onUpdate({ model: ctrl.model.replace(/[^0-9]/g, '') });
    };
}

export default angular
    .module(moduleName, [percent, ignoreLast])
    .component(moduleName, vetPercentageInput)
    .name;
