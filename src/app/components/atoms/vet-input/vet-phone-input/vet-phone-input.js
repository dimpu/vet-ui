'use strict';

let templateUrl = require('./vet-phone-input.html');

const moduleName = 'vetPhoneInput';

function vetPhoneInput($filter) {

    return {
        require: 'ngModel',
        scope: {
            placeholder: '@',
            label: '@',
            name: '@',
            validationMessage: '@'
        },
        link: function($scope, $element, $attrs, ctrl) {
            let $input = angular.element($element[0].querySelector('input'));
            let $label = angular.element($element[0].querySelector('label'));

            $input.bind('blur', function() {
                if ($input.val().length == 0) {
                    $label.removeClass('active');
                }
                if (!$scope.placeholder) {
                    $input.removeClass('float-up');
                }
                $input.removeClass('active');
                $label.removeClass('focus');
            });

            $input.bind('focus', function() {
                $label.addClass('active');
                $label.addClass('focus');
                $input.addClass('active');
                if (!$scope.placeholder) {
                    $input.addClass('float-up');
                }
            });
            // scope.inputValue is the value of input element used in template

            ctrl.$formatters.unshift(value => {
                $scope.model = $filter('phonenumber')(value);
                return $scope.model;
            });

            $scope.handleChange = () => {
                $scope.model = $filter('phonenumber')($scope.model);
                ctrl.$setViewValue($scope.model);
            };
        },
        templateUrl
    };
}

export default angular.module(moduleName, [])
    .directive(moduleName, ['$filter', vetPhoneInput])
    .name;
