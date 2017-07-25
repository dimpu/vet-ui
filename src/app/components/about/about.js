import angular from 'angular';
import '@uirouter/angularjs';
import aboutComponent from './about.component';

let aboutModule = angular.module('about', [
	'ui.router'
])
.config(($stateProvider)=>{
	$stateProvider
		.state('about', {
			url: '/about',
			template: '<about></about>'
		});
})
.component('about', aboutComponent);

export default aboutModule;