import {async as AsyncScheduler} from 'rxjs/scheduler/async';
import {tick} from '@angular/core/testing';
declare var spyOn: Function;

export class AsyncZoneTimeInSyncKeeper {

    time = 0;

    constructor() {
        spyOn(AsyncScheduler, 'now').and.callFake(() => {
            /* tslint:disable-next-line */
            console.info('time', this.time);
            return this.time;
        });
    }

    tick(time?: number) {
        if (typeof time !== 'undefined') {
            this.time += time;
            tick(this.time);
        } else {
            tick();
        }
    }
}
