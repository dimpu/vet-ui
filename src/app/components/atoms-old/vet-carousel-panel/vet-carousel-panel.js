import templateUrl from './vet-carousel-panel.html';

const moduleName = 'vetCarouselPanel';

const vetCarouselPanel = {
    bindings: {
        title: '@',
        disabled: '<',
        completeness: '<',
        onNext: '&'
    },
    transclude: true,
    templateUrl,
    controller: ['isMobile', vetCarouselPanelCtrl]
};

function vetCarouselPanelCtrl(isMobile) {
    const ctrl = this;

    ctrl.$onInit = () => {
        ctrl.isMobile = isMobile;
        ctrl.isNotMobile = !isMobile;

        ctrl.buttonText = ctrl.isMobile ? 'Next' : 'Next Step';
    };
}

export default angular
    .module(moduleName, [])
    .component(moduleName, vetCarouselPanel)
    .name;
