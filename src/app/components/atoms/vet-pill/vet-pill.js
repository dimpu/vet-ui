'use strict';

import templateUrl from './vet-pill.html';
import angularTooltips from 'angular-tooltips';

const moduleName = 'vetPill';

/**
 * vet-pill directive
 * 2/22/2017
 */

function vetPill() {
    return {
        scope: {
            label: "@",
            starred: "<",
            tooltip: "@"
        },
        templateUrl: templateUrl
    };
}

export default angular.module(moduleName, [angularTooltips])
    .directive(moduleName, vetPill)
    .name;
