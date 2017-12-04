const moduleName = 'ignoreLast';

function ignoreLast() {
    return {
        require: 'ngModel',
        link: (scope, element, attrs, modelCtrl) => {
            element.on('keyup', event => {
                if (element[0].selectionStart === element.val().length) {
                    element[0].setSelectionRange(
                        element[0].selectionStart - 1,
                        element[0].selectionStart - 1
                    );
                } else if (element[0].selectionEnd === element.val().length) {
                    element[0].setSelectionRange(
                        element[0].selectionStart,
                        element[0].selectionEnd - 1
                    );
                }
            });
        }
    };
}

export default angular
    .module(moduleName, [])
    .directive(moduleName, ignoreLast)
    .name;
