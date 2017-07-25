import ngFileUpload from 'ng-file-upload';
import FilePickerBuilder from '../../../utils/file-picker-integrations';
import templateUrl from './view.html';

const moduleName = 'vetFileUpload';

const vetFileUpload = {
    bindings: {
        fileType: '<',
        onUpload: '&',
        onGoogleDriveUpload: '&',
        onDropboxUpload: '&'
    },
    templateUrl,
    controller: ['isMobile', vetFileUploadController]
};

function vetFileUploadController(isMobile) {
    const ctrl = this;

    const onGoogleDriveSuccess = ({ downloadUrl, token }) =>
        ctrl.onGoogleDriveUpload({ url: downloadUrl + '&token=' + token });

    const onDropboxSuccess = ({ url }) =>
        ctrl.onDropboxUpload({ url });

    ctrl.$onChanges = changes => {
        if (changes.fileType && ctrl.fileType)
            new FilePickerBuilder({ type: ctrl.fileType, onDropboxSuccess, onGoogleDriveSuccess })
                .afterInit(({ googleDrivePicker, dropboxPicker }) => {
                    ctrl.googleDrivePicker = googleDrivePicker;
                    ctrl.dropboxPicker = dropboxPicker;
                });
    };

    ctrl.isMobile = isMobile;
    ctrl.isNotMobile = !isMobile;
}

export default angular.module(moduleName, [ngFileUpload])
    .component(moduleName, vetFileUpload)
    .name;
