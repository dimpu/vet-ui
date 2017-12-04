import money from '../directives/money';
import templateUrl from './vet-salary-input.html';

const moduleName = 'vetSalaryInput';

const vetSalaryInput = ['$timeout',
    function ($timeout) {
        return {
            require: 'ngModel',
            scope: {
                placeholder: '@',
                label: '@',
                name: '@',
                validationMessage: '@',
                onUpdate: '&'
            },
            link: function($scope, $element, $attrs, ngModel) {
                $scope.model = '';

                $scope.handleChange = () => {
                    $timeout(() => {
                        ngModel.$setViewValue($scope.model);
                        $scope.onUpdate({ value: $scope.model });
                    });
                };

                $scope.$watch(() => ngModel.$modelValue, (nv, ov) => $scope.model = nv);
            },
            templateUrl,
        };
    }
];

export default angular.module(moduleName, [money])
    .directive(moduleName, vetSalaryInput)
    .name;
