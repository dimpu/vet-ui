import templateUrl from './vet-collapsible.html';

const moduleName = 'vetCollapsible';

const vetCollapsible = {
    bindings: {
        isOpen: '<'
    },
    transclude: true,
    templateUrl,
    controller: ['$element', '$timeout', vetCollapsibleController]
};

function vetCollapsibleController($element, $timeout) {
    const ctrl = this;

    const outerElement = $element[0];
    const innerElement = angular.element(outerElement.querySelector('.content'))[0];

    let newHeight = null;

    ctrl.$onChanges = onChanges;

    function onChanges(changes) {
        if (changes.isOpen) {
            if (!ctrl.isOpen && newHeight) {
                outerElement.style.height = newHeight + 'px';
            }

            $timeout(() => {
                newHeight = ctrl.isOpen ? innerElement.offsetHeight : 0;
                outerElement.style.height = newHeight + 'px';


                if (ctrl.isOpen) {
                    $timeout(() => {
                        outerElement.style.height = 'inherit';
                    }, 500);
                }
            }, 0);
        }
    }
}

export default angular.module(moduleName, [])
    .component(moduleName, vetCollapsible)
    .name;
