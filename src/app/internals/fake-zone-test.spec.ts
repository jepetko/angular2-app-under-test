import {fakeAsync, tick} from '@angular/core/testing';
import {TestScheduler} from 'rxjs/testing/TestScheduler';
import {Observable} from 'rxjs/Observable';
import {AsyncZoneTimeInSyncKeeper} from './async-zone-time-in-sync-keeper.utils';
import {monkeypatchScheduler} from './monkey-patch-scheduler.utils';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/merge';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/timeInterval';
import 'rxjs/add/operator/pluck';

describe('Fake zone test', () => {

    it('drains the zone task by task', fakeAsync(() => {

        setTimeout(() => {
            let i = 0;
            const handle = setInterval(() => {
                if (++i === 5) {
                    clearInterval(handle);
                }
            }, 1000);
            let j = 0;
            const handle2 = setInterval(() => {
                if (++j === 3) {
                    clearInterval(handle2);
                }
            }, 1000);
        }, 10000);

        tick(15000);

    }));

    it('test with tick', fakeAsync(() => {

        let inSyncKeeper = new AsyncZoneTimeInSyncKeeper();

        let o = Observable.of('hello').delay(5000);

        let receivedValue;
        o.subscribe((value) => {
            receivedValue = value;
        });

        inSyncKeeper.tick(5000);

        expect(receivedValue).toEqual('hello');
    }));
});

describe('TestScheduler monkeypatch', () => {

    it('test with TestScheduler', () => {
        const testScheduler = new TestScheduler(null);
        testScheduler.maxFrames = 1000000;

        monkeypatchScheduler(testScheduler);

        let o = Observable.of('hello').delay(5000);

        let receivedValue;
        o.subscribe((value) => {
            receivedValue = value;
        });

        testScheduler.flush();

        expect(receivedValue).toEqual('hello');
    });

    it('test with TestScheduler (more complex)', () => {
        const testScheduler = new TestScheduler(null);
        testScheduler.maxFrames = 1000000;

        monkeypatchScheduler(testScheduler);

        // example taken from: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/merge.md
        let source1 = Observable.interval(100)
            .timeInterval()
            .pluck('interval');
        let source2 = Observable.interval(150)
            .timeInterval()
            .pluck('interval');

        let source = Observable.merge(source1, source2).take(5);

        let receivedValues = [];
        source.subscribe(value => {
            receivedValues.push(value);
        });

        testScheduler.flush();

        expect(receivedValues).toEqual([100, 150, 100, 150, 100]);
    });
});
