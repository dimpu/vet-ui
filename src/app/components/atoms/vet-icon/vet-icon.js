'use strict';

// vet-icon directive
var templateUrl = require('./vet-icon.html');

const moduleName = 'vetIcon';

function vetIcon() {
  return {
    scope: {
        label : "@",
        icon: "@",
        url: "@"
    },
    link: function(scope, element){
    },
    templateUrl: templateUrl
  }
};

export default angular.module(moduleName, [])
    .directive(moduleName, vetIcon)
    .name;
