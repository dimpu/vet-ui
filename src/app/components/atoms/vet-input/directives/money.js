import { money as moneyFilter, positiveWholeNumber } from 'utils/filters';

const moduleName = 'money';

function money() {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, modelCtrl) => {
            modelCtrl.$parsers.push(inputValue => {
                const viewValue = moneyFilter(inputValue);
                if (viewValue !== inputValue) {
                    modelCtrl.$setViewValue(viewValue);
                    modelCtrl.$render();
                }
                return positiveWholeNumber(inputValue);
            });

            modelCtrl.$formatters.push(inputValue => {
                return moneyFilter(inputValue);
            });
        }
    };
}

export default angular
    .module(moduleName, [])
    .directive(moduleName, money)
    .name;
