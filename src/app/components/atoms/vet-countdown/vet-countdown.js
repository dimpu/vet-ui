import templateUrl from './vet-countdown.html';
let moment = require('moment');

const moduleName = 'vetCountdown';

const dateFromString = str => {
    if(str){
        let arr = str.split(/[^0-9]/);
        return new Date (arr[0],arr[1]-1,arr[2],arr[3],arr[4],arr[5] );
    }
    return str;
};

function vetCountdownController($timeout) {
  	const ctrl = this;

    ctrl.zeroDate = moment();
    ctrl.timedOut = false;

    ctrl.$onInit = () => {
        ctrl.zeroDate = moment(ctrl.startDateTime, "YYYY-MM-DDTHH:mm:ss.SSSZ");
        ctrl.zeroDate.add(ctrl.countdownDurationMinutes, 'm');
        ctrl.onTimer();
    };

    let timer = $timeout(ctrl.onTimeout,ctrl.updateInterval);

    ctrl.onTimer = () => {
        let dur = moment.duration(ctrl.zeroDate.diff(moment()));
        if(dur.days() <= 0 && dur.hours() <= 0 && dur.minutes() <= 0 && dur.seconds() <= 0){
            ctrl.timedOut = true;
        }
        else{
            // Correctly format expiration message based on how far in the future
            if(dur.days() == 0){
                if(dur.hours() == 0){
                    ctrl.timeRemaining = "Expires in " + dur.minutes() + " minute" + (dur.minutes() == 1 ? "" : "s") + " and " + dur.seconds() + " second" + (dur.seconds() == 1 ? "" : "s");
                }
                else{
                    ctrl.timeRemaining = "Expires in " + dur.hours() + " hour" + (dur.hours() == 1 ? "" : "s") + " and " + dur.minutes() + " minute" + (dur.minutes() == 1 ? "" : "s");
                }
            }
            else{
                ctrl.timeRemaining = "Expires in " + dur.days() + " day" + (dur.days() == 1 ? "" : "s") + " and " + dur.hours() + " hour" + (dur.hours() == 1 ? "" : "s");
            }
            timer = $timeout(ctrl.onTimer,ctrl.updateInterval);
        }
    };
}

const vetCountdown = {
	bindings: {
        startDateTime: "@",
        countdownDurationMinutes: "@",
        updateInterval: "@",
        endMessage: "@"
	},
  	templateUrl,
  	controller: ['$timeout', vetCountdownController]
};

export default angular.module(moduleName, [])
    .component(moduleName, vetCountdown)
    .name;
