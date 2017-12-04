import 'ui-select';
import templateUrl from './vet-ui-select.html';

const moduleName = 'vetUiSelect';

const vetUiSelect = {
    bindings: {
        label : '@',
        placeholder: '@',
        ngModel: "<",
        options: '<',
        isAjax: '<',
        refresh: '&',
        onSelect: '&',
        appendToBody: '<',
        light: '<',
        disabled: '<?',
        error: '<',
        selectMode: '<',
        id: '@'
    },
    templateUrl: templateUrl,
    controller: [vetUiSelectController]
};

export default angular.module(moduleName, 
    // ['ui.select']
)
    .component(moduleName, vetUiSelect)
    .name;

function vetUiSelectController() {
    let ctrl = this;
    ctrl.appendToBody = angular.isDefined(ctrl.appendToBody) ? ctrl.appendToBody : true;
    
    ctrl.$onInit = () => {
        ctrl.id = ctrl.id  || 'id_' + new Date();
    };
    

    ctrl.handleSelect = () => {
        ctrl.updateLabel();
        ctrl.onSelect({ selection: ctrl.ngModel });
    };

    ctrl.updateLabel = function(){
        ctrl.labelActive = true;
        ctrl.labelFocus = true;
    };

    ctrl.onBlur = (isOpen) => {
        if (!isOpen) {
            if (!ctrl.ngModel || !ctrl.ngModel.key) {
                ctrl.labelActive = false;
            }
            ctrl.labelFocus = false;
        }
    };

    ctrl.$onChanges = changes => {

        if (changes.ngModel && ctrl.ngModel) {
            if(!angular.isUndefined(ctrl.ngModel.value)) {
                ctrl.labelActive = true;
            }
        }

        if (changes.isAjax && !ctrl.isAjax) {
            const originalOptions = angular.copy(ctrl.options);
            ctrl.refresh = (queryObj) => {
                let { query } = queryObj;
                query = query ? query.toLowerCase() : '';
                if (originalOptions) {
                    ctrl.options = originalOptions.filter(item => {
                        if (item.value) {
                            const value = item.value.toLowerCase();
                            return value.search(query) > -1;
                        }
                    });
                }
            };
        }
    };
}
