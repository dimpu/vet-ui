import 'angular-strap/dist/angular-strap.min.js';
import 'angular-strap/dist/angular-strap.tpl.min.js';

var templateUrl = require('./vet-dropdown-skillselect.html');

const moduleName = 'vetDropdownSkillSelect';

function vetDropdownSkillSelectController($scope, $dropdown, $filter, $element) {
    let ctrl = this;

    var dropdown = $dropdown($element, {
        content: 'Hello',
        show: false,
        trigger: 'manual',
        container: 'body',
        customClass: 'vet-dropdown-skillselect'
    });

    ctrl.dropdownOptions = ['0-1', '1-2', '2-4', '4-6', '6+'];

    dropdown.$scope.content = ctrl.dropdownOptions.map((year)=>{
        return{
            text: year + ' years exp',
            click: 'setExperience("'+ year +'")'
        };
    });

    dropdown.$scope.setExperience = (year) => {
        let i = ctrl.dropdownOptions.indexOf(year);
        let tag = ctrl.tags[i];
        ctrl.update({tag: {[tag.id]: true}});
        ctrl.model = tag;
        ctrl.year = year;
    };

    $element.on('click', function(event) {
        event.preventDefault();
        // if the tag is selected (has years selected)
        if (ctrl.model && ctrl.year) {
            let i = ctrl.dropdownOptions.indexOf(ctrl.year);
            let tag = ctrl.tags[i];
            ctrl.update({tag: {[tag.id]: false}});
            ctrl.model = undefined;
            ctrl.year = undefined;
            $scope.$apply();
        } else {
            dropdown.show();
        }
    });
}

const vetDropdownSkillSelect = {
    bindings: {
        label: '@',
        year: '@',
        model: '<',
        update: '&',
        tags: '<'
    },
    controller: ['$scope', '$dropdown', '$filter', '$element', vetDropdownSkillSelectController],
    templateUrl
};

export default angular.module(moduleName, ['mgcrea.ngStrap.dropdown'])
    .component(moduleName, vetDropdownSkillSelect)
    .name;
