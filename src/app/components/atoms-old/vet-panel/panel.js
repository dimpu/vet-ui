import templateUrl from './panel.html';

const moduleName = 'panel';

const panel = {
    bindings: {
        title: '@',
        disclaimer: '@',
        isEditable: '<',
        onEdit: '&',
    },
    transclude: true,
    templateUrl: templateUrl,
    controller: [ function() {
        'use strict';
        const ctrl = this;
    }]
};

export default angular.module(moduleName, [])
    .component(moduleName, panel)
    .name;
