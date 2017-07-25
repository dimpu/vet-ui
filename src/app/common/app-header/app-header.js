import angular from 'angular';
import '@uirouter/angularjs';
import AppHeaderComponent from './app-header.component';

let appHeaderModule = angular.module('app-header', [
	'ui.router'
])
.component('appHeader', AppHeaderComponent);

export default appHeaderModule;
