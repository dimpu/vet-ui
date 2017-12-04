import templateUrl from './vet-button-container.html';

const moduleName = 'vetButtonContainer';

const vetButtonContainer = {
    bindings: {
        title: '<',
        model: '<',
        items: '<',
        onUpdate: '&'
    },
    templateUrl,
    controller: [vetButtonContainerCtrl]
};

function vetButtonContainerCtrl() {
    const ctrl = this;

    const updateFullTitle = () => {
        ctrl.model = ctrl.model || {};
        ctrl.fullTitle = ctrl.model.id ?
            ctrl.title + ' (' + ctrl.model.year + ')' :
            ctrl.title;
    };

    ctrl.$onInit = () => {
        ctrl.expand = false;
    };

    ctrl.$onChanges = changes => {
        if (changes.model) {
            ctrl.model = ctrl.model || {};
        }

        if (changes.title) {
            updateFullTitle();
        }
    };

    ctrl.handleClick = option => {
        let tag = {};
        ctrl.model = ctrl.model || {};

        if (ctrl.model.id === option.id) {
            if (ctrl.model.root_id) {
                tag[ctrl.model.root_id] = false;
            }
            ctrl.model = {};
        } else {
            tag[ctrl.model.id] = false;
            tag[option.id] = true;
            ctrl.model = option;
        }

        updateFullTitle();
        ctrl.onUpdate({ tag });
        ctrl.expand = false;
    };
}

export default angular
    .module(moduleName, [])
    .component(moduleName, vetButtonContainer)
    .name;
