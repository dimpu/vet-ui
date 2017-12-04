import templateUrl from './vet-mobile-pullover.html';
import { NetworkSelectors } from  '../../../store/network';

const moduleName = 'vetMobilePullover';

function vetMobilePulloverController($store, $timeout) {
  	const ctrl = this;

    ctrl.mapState = state => ({
        saving: NetworkSelectors.isSavingUser(state)
    });

    ctrl.$onInit = () => {
        $store.connect(ctrl);
        ctrl.scrollPosition;
    };

  	ctrl.$onChanges = changes => {
        let profile = document.getElementsByTagName('candidate-profile');
        if (changes.isOpen) {

            if (changes.isOpen.currentValue === false) {
                angular.element(profile).css({
                    'overflow': 'scroll',
                    'height': 'inherit'
                });
                //goes to scroll Position
                window.scrollTo(0, ctrl.scrollPosition);
            }

            if (changes.isOpen.currentValue === true){
                //remembers scroll position
                ctrl.scrollPosition = document.body.scrollTop;

                $timeout(() => angular.element(profile).css({
                    'overflow': 'hidden',
                    'height': '100vh'
                }), 500);
            }
        }
    };

}

const vetMobilePullover = {
	bindings: {
  		isOpen: '<',
        label: '@',
        status: '<',
        onClose: '&'
  	},
  	transclude: true,
  	templateUrl,
  	controller: ['$store', '$timeout', vetMobilePulloverController]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetMobilePullover)
    .name;
