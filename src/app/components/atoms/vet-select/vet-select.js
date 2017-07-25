import templateUrl from './vet-select.html';

const moduleName = 'vetSelect';

const vetSelect = {
    bindings: {
        label: '@',
        model: '<',
        options: '<',
        onSelect: '&'
    },
    templateUrl,
    controller: ['$scope', '$element', vetSelectCtrl]
};

function vetSelectCtrl($scope, $element) {
    const ctrl = this;

    const select = angular.element($element[0].querySelector('select'));
    const label = angular.element($element[0].querySelector('label'));

    const handleActive = () => {
        label.addClass('active');
    };

    const handleFocus = () => {
        label.addClass('active');
        label.addClass('focus');
        select.addClass('active');
    };

    const handleBlur = () => {
        label.removeClass('focus');
        select.removeClass('active');
    };

    select.bind('blur', handleBlur);
    select.bind('focus', handleFocus);

    ctrl.$onChanges = changes => {
        if (changes.model && ctrl.model.key) {
            handleActive();
        }
    };

    ctrl.handleSelect = function(){
        label.addClass('active');
        label.addClass('focus');
    };
}

export default angular
    .module(moduleName, [])
    .component(moduleName, vetSelect)
    .name;
