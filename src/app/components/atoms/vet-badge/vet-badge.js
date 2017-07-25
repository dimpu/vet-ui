'use strict';

// vet-icon directive
var templateUrl = require('./vet-badge.html');

const moduleName = 'vetBadge';

function vetBadge() {
  return {
    scope: {
        value: "@"
    },
    link: function(scope, element){
    },
    templateUrl: templateUrl
  }
};

export default angular.module(moduleName, [])
    .directive(moduleName, vetBadge)
    .name;
