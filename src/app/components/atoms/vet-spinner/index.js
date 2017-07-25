import templateUrl from './vet-spinner.html';
import { NetworkSelectors } from  '../../../store/network';

const moduleName = 'vetSpinner';

const vetSpinner = {
    templateUrl,
    bindings: {
        show: '<'
    },
    controller: ['isMobile', '$timeout', vetSpinnerCtrl]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetSpinner)
    .name;

function vetSpinnerCtrl(isMobile, $timeout) {
    let ctrl = this;

    ctrl.$onInit = () => {
        ctrl.isMobile = isMobile;
    };

    let currentTimeout;
    ctrl.$onChanges = (changeObj) => {
        if (changeObj.show) {
            let show = changeObj.show.currentValue;

            if (show) {
                ctrl.wasSaving = true;
                $timeout.cancel(currentTimeout);
            } else {
                if (ctrl.wasSaving) {
                    ctrl.saved = true;
                    currentTimeout = $timeout(() => {
                        if (!show) ctrl.saved = false;
                    }, 2000);
                    ctrl.wasSaving = false;
                }
            }
        }
    };
}

