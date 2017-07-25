const moduleName = 'vetYearDifference';

const vetYearDifference = {
    bindings: {
        startMonth: '<',
        endMonth: '<',
        startYear: '<',
        endYear: '<',
    },
    template: '<span ng-bind="$ctrl.difference" class="year-difference"></span>',
    controller: ['isMobile', vetYearDifferenceCtrl]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetYearDifference)
    .name;

function vetYearDifferenceCtrl (isMobile) {
    let ctrl = this;
    let yr, mo, string;

    let today = new Date();

    ctrl.$onChanges = () => {
        let endMonth = ctrl.endMonth || {index: today.getMonth()};
        let endYear = ctrl.endYear || {value: today.getFullYear()};
        let startMonth = ctrl.startMonth || {index: today.getMonth()};
        let startYear = ctrl.startYear || {value: today.getFullYear()};
        let diff = endMonth.index - startMonth.index + (12 * (endYear.value - startYear.value)) + 1;

        yr = Math.floor(diff / 12);
        mo = diff % 12;

        if(isMobile) {
            if (yr === 0) {
                if (mo === 1) {
                    string = mo + ' Month';
                } else {
                    string = mo + ' Months';
                }
            } else if (yr === 1 ) {
                string = yr + ' Year';
            } else {
                string = yr + ' Years';
            }
        } else {
            if (yr === 0) {
                string = mo + 'mo';
            } else if (mo === 0 ) {
                string = yr + 'yr';
            } else {
                string = yr + 'yr ' + mo + 'mo';
            }
        }

        ctrl.difference = string;
    };
}
