import templateUrl from './vet-input.html';

const moduleName = 'vetInput';

const vetInput = [vetInputController];

function vetInputController() {
    return {
        require: 'ngModel',
        scope: {
            placeholder : '@',
            label : '@',
            name : '@',
            pattern: '@',
            inputType: '@',
            icon: '@',
            validationMessage: '@',
            onChange: '&?',
            onUpdate: '&?'
        },
        link: function (scope, element, attrs, ngModel) {
            scope.inputType = scope.inputType || 'text';
            scope.updateModel = updateModel;

            function updateModel() {
                ngModel.$setViewValue(scope.model);
                ngModel.$render();
                if (scope.onUpdate) {
                    scope.onUpdate({ value: scope.model });
                }
            }

            scope.$watch(() => ngModel.$viewValue, newValue => {
                if (scope.onChange) {
                    scope.onChange();
                }
                scope.model = newValue;
            });
        },
        templateUrl
    };
}

export default angular.module(moduleName, [])
    .directive(moduleName, vetInput)
    .name;
