'use strict';

const moduleName = 'vetYearRange';

const vetYearRange = {
    template: '<span ng-bind="$ctrl.difference" class="year-difference"></span>',
    bindings: {
        isCurrent: '<',
        startMonth: '<',
        endMonth: '<',
        startYear: '<',
        endYear: '<',
    },
    controller: ['$filter', 'isMobile', vetYearRangeController]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetYearRange)
    .name;

function vetYearRangeController($filter, isMobile) {
    let ctrl = this;

    const formatDate = (month, year) => {
        if (isMobile) {
            if (month.key && year.value) {
                return `${month.key}/${year.value.slice(2)}`;
            }
        } else {
            if (month.short && year.value) {
                return `${month.short} ${year.value}`;
            }
        }
    };

    ctrl.$onChanges = () => {
        if (ctrl.isCurrent || !ctrl.endMonth || !ctrl.endYear) {
            ctrl.end = 'Present';
        }  else {
            ctrl.end = formatDate(ctrl.endMonth, ctrl.endYear);
        }
        if (!ctrl.startMonth || !ctrl.startYear) {
            ctrl.start = '';
        }  else {
            ctrl.start = formatDate(ctrl.startMonth, ctrl.startYear);
        }
        ctrl.difference = `${ctrl.start} - ${ctrl.end}`;
    };
}

