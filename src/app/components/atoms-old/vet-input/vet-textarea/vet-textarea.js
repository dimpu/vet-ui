import templateUrl from './vet-textarea.html';

const moduleName = 'vetTextarea';

const vetTextarea = ['$timeout', vetTextareaFunc];

function vetTextareaFunc($timeout) {
    'use strict';

    return {
        require: 'ngModel',
        scope: {
            placeholder : '@',
            maxlength : '@',
            label : '@',
            name : '@',
            rows: '<',
            cols: '<',
            validationMessage: '@'
        },
        link: function ($scope, $element, $attrs, ctrl) {
            var $textarea = angular.element($element[0].querySelector('textarea'));
            var $label = angular.element($element[0].querySelector('label'));

            $textarea.bind('blur', function () {
                if ($textarea.val().length == 0 && !$attrs.placeholder){
                    $label.removeClass('float-up');
                }
                $textarea.removeClass('active');
                $label.removeClass('focus');
            });
            $textarea.bind('focus', function () {
                $label.addClass('active');
                $label.addClass('focus');
                $textarea.addClass('active');
            });

            $scope.change = () => {
                $timeout(() => {
                    ctrl.$setViewValue($scope.model);
                    ctrl.$render();
                });
            };

            $scope.$watch(() => ctrl.$modelValue, (nv, ov) => $scope.model = nv);
        },
        templateUrl: templateUrl
    };
};

export default angular.module(moduleName, [])
    .directive(moduleName, vetTextarea)
    .name;
