import templateUrl from './vet-bar.html';

const moduleName = 'vetBar';

function vetBar($timeout, isMobile){
    'use strict';
    return {
        scope: {
            year: '=',
            fill: '=',
            label: '<'
        },
        link: function(scope, element, attr) {
            var string;

            scope.isMobile = isMobile;
            scope.isNotMobile = !isMobile;

            var $bar = angular.element(element[0].querySelector('.bar'));
            $bar.css({'width': '0%'});
            scope.$watch('fill', nVal => {
                if (nVal) {
                    $timeout(() => {
                        scope.yearlabel = `${nVal}%`;
                        if (nVal > 100) {
                            nVal = 100;
                            scope.arrow = true;
                        } else {
                            scope.arrow = false;
                        }
                        $bar.css({'width': `${nVal}%`, 'transition': 'all 0.3s ease 0.5s'});
                        scope.$digest();
                    }, 0);
                }
            });
            scope.$watch('year', (nVal) =>{
                if (nVal) {
                    $timeout(function(){
                        string = scope.year;
                        if (string.indexOf('None') !== -1) {
                            $bar.css({'width': '0', 'transition': 'all 0.1s ease 0.5s'});
                            scope.yearlabel = '0-1 Year';
                        } else if (string.indexOf('0-1') !== -1) {
                            $bar.css({'width': '20%', 'transition': 'all 0.1s ease 0.5s'});
                            scope.yearlabel = '0-1 Year';
                        } else if (string.indexOf('1-2') !== -1) {
                            $bar.css({'width': '40%', 'transition': 'all 0.2s ease 0.5s'});
                            scope.yearlabel = '1-2 Years';
                        } else if (string.indexOf('2-4') !== -1) {
                            $bar.css({'width': '60%', 'transition': 'all 0.3s ease 0.5s'});
                            scope.yearlabel = '2-4 Years';
                        } else if (string.indexOf('4-6') != -1) {
                            $bar.css({'width': '80%', 'transition': 'all 0.4s ease 0.5s'});
                            scope.yearlabel = '4-6 Years';
                        } else if (string.indexOf('6+') !== -1) {
                            $bar.css({'width': '100%', 'transition': 'all 0.5s ease 0.5s'});
                            scope.yearlabel = '6+ Years';
                        }
                        scope.$digest();
                    }, 0);
                }
            });

        },
        templateUrl,
    };
}

export default angular.module(moduleName, [])
    .directive(moduleName, ['$timeout', 'isMobile', vetBar])
    .name;
