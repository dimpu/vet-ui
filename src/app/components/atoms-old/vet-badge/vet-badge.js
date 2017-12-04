'use strict';

// vet-icon directive
var templateUrl = require('./vet-badge.html');

const moduleName = 'vetBadge';

/**
 * Represents a book.
 * @constructor
 * @param {string} title - The title of the book.
 * @param {string} author - The author of the book.
 */

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
