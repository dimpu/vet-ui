import angular from 'angular';
import Home from './home/home';
import VetAtoms from './atoms';

let componentModule = angular.module('app.components', [
	Home.name,
	VetAtoms.name
]);

export default componentModule;