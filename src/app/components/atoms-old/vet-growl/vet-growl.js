import templateUrl from './vet-growl.html';
import { NetworkSelectors, NetworkActions } from '../../../store/network';

const moduleName = 'vetGrowl';

function vetGrowlController(isMobile, $store) {
  	const ctrl = this;

    ctrl.mapState = state => ({
        networkGrowl: NetworkSelectors.getCurrentStatus(state).toJS()
    });

    ctrl.mapDispatch = {
        resetStatus: NetworkActions.resetStatus
    };

    ctrl.storeUpdate = (state, actions) => {
        if (ctrl.networkGrowl.active) {
            ctrl.isOpen = true;
            ctrl.info = ctrl.networkGrowl;
        }
    };

    ctrl.$onInit = () => {
        ctrl.isOpen = false;
        ctrl.info = {};
        ctrl.isMobile = isMobile;
        $store.connect(ctrl);
    };

    ctrl.dismiss = () => {
        ctrl.isOpen = false;

        if (ctrl.networkGrowl.active) {
            ctrl.resetStatus();
        }
    };
}

const vetGrowl = {
	bindings: {},
  	templateUrl,
  	controller: ['isMobile', '$store', vetGrowlController]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetGrowl)
    .name;
