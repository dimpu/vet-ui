
import vetteryDropdownMultiselect from './angularjs-dropdown-multiselect';
import templateUrl from './vet-dropdown-multiselect.html';

const moduleName = 'vetDropdownMultiselect';

const vetDropdownMultiselect = {
    bindings: {
        onUpdate: '&',
        options: '<',
        model: '<',
        name: '@'
    },
    templateUrl,
    controller: [vetDropdownMultiselectCtrl]
};

export default angular.module(moduleName,
    [ vetteryDropdownMultiselect ])
    .component(moduleName, vetDropdownMultiselect)
    .name;

function vetDropdownMultiselectCtrl () {
    let ctrl = this;
    ctrl.selectedModel = [];

    const ALL_TAG = {
        id: 'all',
        label: 'All'
    };

    const getAllTags = () => ctrl.dropdownOptions.map((tag) => {
        return {'id': tag.id};
    }).filter((tag) => tag.id !== ALL_TAG.id);

    const removeAllTags = () => ctrl.onUpdate({action: false, model: getAllTags()});

    const addAllTags = () => ctrl.onUpdate({action: true, model: getAllTags()});

    const checkTags = (item) => {
        if (item.id === ALL_TAG.id) {
            if (ctrl.selectedModel.length === ctrl.dropdownOptions.length) {
                ctrl.selectedModel = [];
                removeAllTags();
            } else {
                ctrl.selectedModel = getAllTags();
                addAllTags();
            }
        } else {
            return item;
        }
    };

    ctrl.$onInit = () => {
        ctrl.dropdownOptions = ctrl.options;
        ctrl.name = ctrl.name || 'Select';

        if (ctrl.dropdownOptions.length > 1 &&
            ctrl.dropdownOptions.map(opt => opt.id).indexOf(ALL_TAG.id) < 0
        ) {
            ctrl.dropdownOptions.unshift(ALL_TAG);
        }
    };

    ctrl.$onChanges = (changes) => {
        if (changes.options && ctrl.options) {
            ctrl.selectedModel = ctrl.options
                .filter(o => o.model)
                .map(o => ({ id: o.id }));
        }
    };

    ctrl.isActive = () => ctrl.selectedModel && ctrl.selectedModel.length > 0;

    ctrl.singleUpdate = () => {
        if (ctrl.isActive()) {
            ctrl.selectedModel = [];
            removeAllTags();
        } else {
            ctrl.selectedModel.push(ctrl.dropdownOptions[0]);
            addAllTags();
        }
    };

    ctrl.dropdownEvents = {
        onItemSelect: (item) => {
            let tags = checkTags(item);
            if (tags) {
                ctrl.onUpdate({action: true, model: [tags]});
            }
        },
        onItemDeselect: (item) => {
            let tags = checkTags(item);
            if (tags) {
                ctrl.onUpdate({action: false, model: [tags]});
            }
        }
    };

    ctrl.dropdownSettings = {
        showUncheckAll: false,
        showCheckAll: false,
        dynamicTitle: false,
        closeOnSelect: false,
    };

    ctrl.translationTexts = {
        buttonDefaultText: ctrl.name,
    };
}

