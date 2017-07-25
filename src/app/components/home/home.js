import angular from 'angular';
import '@uirouter/angularjs';
import homeComponent from './home.component';

let homeModule = angular.module('home', [
	'ui.router'
])
.config(($stateProvider, $urlRouterProvider)=>{
	$urlRouterProvider.otherwise('/');
	
	$stateProvider
		.state('home', {
			url: '/',
			template: '<home></home>'
		});
})
.component('home', homeComponent);

export default homeModule;