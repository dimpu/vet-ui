import templateUrl from './vet-checkbox-radio.html';
import each from 'lodash/each';

const moduleName = 'vetCheckboxRadio';

function vetCheckboxRadio(){
    'use strict';

    return {
        scope:{
            label: '@',
            ngModel: '='
        },
        link: function($scope, $element, $attrs){
            function createSVGEl( def ) {
                let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                if( def ) {
                    svg.setAttributeNS( null, 'viewBox', def.viewBox );
                    svg.setAttributeNS( null, 'preserveAspectRatio', def.preserveAspectRatio );
                }
                else {
                    svg.setAttributeNS( null, 'viewBox', '0 0 100 100' );
                }
                svg.setAttribute( 'xmlns', 'http://www.w3.org/2000/svg' );
                return svg;
            }

            function controlRadiobox( el, svgDef ) {
                let svg = createSVGEl( svgDef );
                el.append( svg );

                el.bind( 'change', function() {
                    resetRadio(el);
                    draw(el);
                } );
            }

            function draw(el) {
                el.find('span').addClass('checked');
                el.find('label').addClass('checked');
                let paths = [];
                let svg = el.find( 'svg' );

                let pathDef = ['M16.667,62.167c3.109,5.55,7.217,10.591,10.926,15.75 c2.614,3.636,5.149,7.519,8.161,10.853c-0.046-0.051,1.959,2.414,2.692,2.343c0.895-0.088,6.958-8.511,6.014-7.3 c5.997-7.695,11.68-15.463,16.931-23.696c6.393-10.025,12.235-20.373,18.104-30.707C82.004,24.988,84.802,20.601,87,16'];

                let animDef = { speed : 0.2, easing : 'ease-in-out' };

                paths.push( document.createElementNS('http://www.w3.org/2000/svg', 'path' ) );

                for( let i = 0, len = paths.length; i < len; ++i ) {
                    let path = paths[i];
                    svg.append( path );
                    path.setAttributeNS( null, 'd', pathDef[i] );

                    let length = path.getTotalLength();
                    // Clear any previous transition
                    //path.style.transition = path.style.WebkitTransition = path.style.MozTransition = 'none';
                    // Set up the starting positions
                    path.style.strokeDasharray = length + ' ' + length;
                    if( i === 0 ) {
                        path.style.strokeDashoffset = Math.floor( length ) - 1;
                    }
                    else path.style.strokeDashoffset = length;
                    // Trigger a layout so styles are calculated & the browser
                    // picks up the starting position before animating
                    path.getBoundingClientRect();
                    // Define our transition
                    path.style.transition = path.style.WebkitTransition = path.style.MozTransition  = 'stroke-dashoffset ' + animDef.speed + 's ' + animDef.easing + ' ' + i * animDef.speed + 's';
                    // Go!
                    path.style.strokeDashoffset = '0';
                }
            }

            function resetRadio( el ) {
                each(el.parent().querySelectorAll('vet-checkbox-radio[ng-model="'+ el.attr('ng-model')+'"]'), function(el){
                    //remove checked classes
                    angular.element(el.querySelector('span')).removeClass('checked');
                    angular.element(el.querySelector('label')).removeClass('checked');
                    //remove path
                    angular.element(el.querySelectorAll('path')).remove();
                });
            }

            controlRadiobox($element);

            // If checkbox already checked, check it
            // Watch for change in parent scope
            $scope.$watch('ngModel', (nv, ov) => {
                if (nv)  draw($element);
            });
        },
        templateUrl: templateUrl
    };
}

export default angular.module(moduleName, [])
    .directive(moduleName, vetCheckboxRadio)
    .name;
