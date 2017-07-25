import { NetworkSelectors } from  '../../../store/network';
var templateUrl = require('./vet-page-load.html');

const moduleName = 'vetPageLoad';

function vetPageLoadCtrl($store) {
    let ctrl = this;

    ctrl.$onInit = () => {
        $store.connect(ctrl);
    };

    ctrl.mapState = state => ({
        show: NetworkSelectors.isInitialLoading(state)
    });
}

const vetPageLoad = {
    templateUrl,
    controller: ['$store', vetPageLoadCtrl]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetPageLoad)
    .name;
