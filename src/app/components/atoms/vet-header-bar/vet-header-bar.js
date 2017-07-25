import templateUrl from './vet-header-bar.html';

const moduleName = 'vetHeaderBar';

const vetHeaderBar = {
    bindings: {},
  	transclude: true,
  	templateUrl
};

export default angular.module(moduleName, [])
    .component(moduleName, vetHeaderBar)
    .name;
