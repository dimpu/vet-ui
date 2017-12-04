import templateUrl from './vet-progress-bar.html';

const moduleName = 'vetProgressBar';

const vetProgressBar = {
    bindings: {
        percentage: '<'
    },
    templateUrl,
    controller: ['isMobile', vetProgressBarCtrl]
};

function vetProgressBarCtrl(isMobile) {
    const ctrl = this;

    ctrl.$onInit = () => {
        ctrl.isMobile = isMobile;
        ctrl.isNotMobile = !isMobile;
    };
}

export default angular
    .module(moduleName, [])
    .component(moduleName, vetProgressBar)
    .name;
