import { percentage, positiveWholeNumber } from 'utils/filters';

const moduleName = 'percent';

function percent() {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, modelCtrl) => {
            modelCtrl.$parsers.push(inputValue => {
                const viewValue = percentage(inputValue);
                if (viewValue !== inputValue) {
                    modelCtrl.$setViewValue(viewValue);
                    modelCtrl.$render();
                }

                return positiveWholeNumber(inputValue);
            });

            modelCtrl.$formatters.push(inputValue => {
                return percentage(inputValue);
            });
        }
    };
}

export default angular
    .module(moduleName, [])
    .directive(moduleName, percent)
    .name;
