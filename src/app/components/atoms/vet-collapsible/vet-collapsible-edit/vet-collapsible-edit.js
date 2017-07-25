'use strict';

import templateUrl from './vet-collapsible-edit.html';

const moduleName = 'vetCollapsibleEdit';

const vetCollapsibleEdit = {
	bindings: {
        isAdd: '<',
        addText: '@',
        isOpen: '<',
        isHover: '<',
        onEdit: '&',
        onSave: '&',
        onDelete: '&',
        onCancel: '&',
        onClose: '&',
        isValid: '<',
        hideDeleteButton: '<'
  	},
  	transclude: true,
  	templateUrl,
  	controller: [vetCollapsibleEditController]
};

function vetCollapsibleEditController() {
    let ctrl = this;

    let initialState = null;

    ctrl.$onInit = onInit;
    ctrl.save = save;
    ctrl.delete = deleteFunction;
    ctrl.edit = edit;
    ctrl.cancel = cancel;
    ctrl.confirmDelete = confirmDelete;
    ctrl.resetState = resetState;

    ctrl.$onChanges = (changeObj) => {
        if (changeObj.isOpen && changeObj.isOpen.currentValue) {
            edit();
        }
    };

    function onInit() {
        initialState = ctrl.isAdd ? 'add' : 'update';
        ctrl.isValid = ctrl.isValid == undefined ? true : ctrl.isValid;
        ctrl.state = initialState;
    }

   function save() {
        ctrl.state = initialState;
        ctrl.onClose();
        ctrl.onSave();
    }

    function deleteFunction() {
        ctrl.onDelete();
        ctrl.state = '';
    }

    function edit() {
        ctrl.state = 'editing';
        ctrl.onEdit();
    }

    function cancel() {
        ctrl.state = initialState;
        ctrl.onClose();
        ctrl.onCancel();
    }

    function confirmDelete() {
        ctrl.state = 'confirm';
    }

    function resetState() {
        ctrl.state = initialState;
    }
}

let VetCollapsibleEditGuideController = ['$scope', vetCollapsibleEditControllerFunction];

function vetCollapsibleEditControllerFunction($scope) {
    $scope.onSave = onSave;
    $scope.onDelete = onDelete;

    function onSave() {}
    function onDelete() {}
}

export default angular.module(moduleName, [])
    .controller('VetCollapsibleEditGuideController', VetCollapsibleEditGuideController)
    .component(moduleName, vetCollapsibleEdit)
    .name;
