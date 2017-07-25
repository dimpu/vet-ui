var templateUrl = require('./vet-button-group.html');

const moduleName = 'vetButtonGroup';

function checkboxModel(model, option) {
    if (model) {
        for (let m of model) {
            if (m.id === option.id) {
                return true;
            }
        }
    }
    return false;
}

function vetButtonGroup(){
    'use strict';
    return {
        restrict: 'E',
        require: 'ngModel',
        scope: {
            items: "=",
            update: "&"
        },
        link: function(scope, element, attrs, ctrl){
            scope.attrs = attrs;
            scope.checkboxModel = option => checkboxModel(scope.model, option);
            scope.change = function($event, key, action){
                var $target = angular.element($event.currentTarget);
                var $buttons = angular.element(element[0].children);
                let value;

                switch (attrs.type) {
                    case "radio":
                        value = {};
                        if (scope.model && scope.model.id) {
                            value = {[scope.model.id]: false};
                        }

                        scope.model = key;
                        ctrl.$setViewValue(key);

                        if (key.id) {
                            value = Object.assign({[key.id]: true}, value);
                        }
                        scope.update({ value });

                        $buttons.removeClass("active");
                        $target.addClass("active");
                        break;
                    case "checkbox":
                        if (scope.checkboxModel(key))  {
                            value = scope.model.filter(function(e) { return e != key;});
                            ctrl.$setViewValue(value);
                            scope.update({value: {[key.id]: false}});
                        } else {
                            value = scope.model.concat(key);
                            ctrl.$setViewValue(value);
                            scope.update({value: {[key.id]: true}});
                        }
                        //$target.toggleClass("active");
                        break;
                }
                if (key.action) key.action();
            };

            scope.$watch(() => ctrl.$modelValue, (nv, ov) => scope.model = nv);
        },
        templateUrl: templateUrl
    };
}

export default angular.module(moduleName, [])
    .directive(moduleName, vetButtonGroup)
    .name;
