import {async, TestBed, ComponentFixture, fakeAsync} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {Observable} from 'rxjs/Observable';
import {SuggestComponent, SuggestSignal} from './suggest.component';
import {SuggestModule} from './suggest.module';
import {SpecUtils} from '../../internals/spec.utils';
import {GoogleBooksAPIService} from '../../core/google-books-api.service';
import {GoogleBooksAPIServiceMock} from '../../core/google-books-api.service.mock';
import queryResult from '../../core/google-books-api.fixture';
import {AsyncZoneTimeInSyncKeeper} from '../../internals/async-zone-time-in-sync-keeper.utils';
import {monkeypatchScheduler} from '../../internals/monkey-patch-scheduler.utils';
import {SpyingTestScheduler} from '../../internals/spying-test-scheduler';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';

const REQUEST_DELAY = 5000;
const DEBOUNCING_VALUE = 300;

describe('Suggest', () => {

    let fixture: ComponentFixture<SuggestComponent>;
    let comp: SuggestComponent;
    let el: any;
    let apiService;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [SuggestModule, NoopAnimationsModule],
            providers: [{
                provide: GoogleBooksAPIService, useClass: GoogleBooksAPIServiceMock
            }]
        }).compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(SuggestComponent);
        comp = fixture.componentInstance;
        el = fixture.debugElement.nativeElement;
        apiService = fixture.debugElement.injector.get(GoogleBooksAPIService);
    }));

    describe('with fakeAsync() and tick()', () => {

        beforeEach(() => {
            fixture.detectChanges();
        });

        describe('on search', () => {

            let timeInSyncKeeper;
            beforeEach(() => {
                timeInSyncKeeper = new AsyncZoneTimeInSyncKeeper();

                spyOn(apiService, 'query').and.returnValue(Observable.of(queryResult).delay(REQUEST_DELAY));
            });

            it('clears the previous result', fakeAsync(() => {
                comp.options = ['non empty'];

                SpecUtils.focusAndInput('Lon', fixture, 'input');

                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                expect(comp.options.length).toBe(0, `was [${comp.options.join(',')}]`);

                timeInSyncKeeper.tick(REQUEST_DELAY);
            }));

            it('emits the start signal', fakeAsync(() => {
                spyOn(comp.onEvent, 'emit').and.callThrough();

                SpecUtils.focusAndInput('Lon', fixture, 'input');

                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                expect(comp.onEvent.emit).toHaveBeenCalledWith({signal: SuggestSignal.start});

                timeInSyncKeeper.tick(REQUEST_DELAY);
            }));

            it('is throttling the possible hits of the API to 1 request per DEBOUNCING_VALUE milliseconds', fakeAsync(() => {

                spyOn(comp, 'suggest').and.callThrough();

                const timeGapBetweenUserInputs = 90;
                ['Lond', 'Londo', 'London'].forEach((userInput: string) => {
                    SpecUtils.focusAndInput(userInput, fixture, 'input');
                    timeInSyncKeeper.tick(timeGapBetweenUserInputs);
                    fixture.detectChanges();
                });

                expect(comp.suggest).not.toHaveBeenCalled();

                // 30 = remaining time 300 - (90 * 3)
                timeInSyncKeeper.tick(30);
                fixture.detectChanges();

                expect(comp.suggest).toHaveBeenCalledTimes(1);
                expect(comp.suggest).toHaveBeenCalledWith('London');

                timeInSyncKeeper.tick(REQUEST_DELAY);
            }));
        });

        describe('on success', () => {

            let timeInSyncKeeper;
            beforeEach(() => {
                timeInSyncKeeper = new AsyncZoneTimeInSyncKeeper();
            });

            it('calls the google API', fakeAsync(() => {
                spyOn(apiService, 'query').and.callThrough();

                SpecUtils.focusAndInput('Shake', fixture, 'input');
                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                expect(apiService.query).toHaveBeenCalledWith('Shake');
            }));

            it('emits the success signal with number of matches', fakeAsync(() => {
                spyOn(comp.onEvent, 'emit').and.callThrough();

                SpecUtils.focusAndInput('Shake', fixture, 'input');
                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                expect(comp.onEvent.emit).toHaveBeenCalledWith({signal: SuggestSignal.success, totalItems: 3});
            }));

            it('shows the titles in the suggest field', fakeAsync(() => {

                SpecUtils.focusAndInput('Shake', fixture, 'input');
                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                let options = document.querySelectorAll('md-option');
                expect(options.length).toBe(3);
                expect(Array.from<HTMLElement>(<NodeListOf<HTMLElement>> options).map((option: HTMLElement) => {
                    return option.childNodes[1].nodeValue.trim();
                })).toEqual(['Hamlet', 'Macbeth', 'King Lear']);
            }));
        });

        describe('on error', () => {

            beforeEach(() => {
                fixture.detectChanges();
            });

            let timeInSyncKeeper;
            beforeEach(() => {
                timeInSyncKeeper = new AsyncZoneTimeInSyncKeeper();
            });

            it('emits the error signal', fakeAsync(() => {
                spyOn(apiService, 'query').and.returnValue(Observable.throw('500'));
                spyOn(comp.onEvent, 'emit').and.callThrough();

                SpecUtils.focusAndInput('Some error causing input', fixture, 'input');
                timeInSyncKeeper.tick(DEBOUNCING_VALUE);
                fixture.detectChanges();

                expect(comp.onEvent.emit).toHaveBeenCalledWith({signal: SuggestSignal.error});
            }));
        });
    });

    describe('with test schedulers', () => {
        describe('on search', () => {

            let testScheduler;
            beforeEach(() => {
                // testScheduler = new TestScheduler(null);
                testScheduler = new SpyingTestScheduler();
                testScheduler.maxFrames = 1000000;
                monkeypatchScheduler(testScheduler);

                fixture.detectChanges();
            });

            beforeEach(() => {
                spyOn(apiService, 'query').and.callFake(() => {
                    return Observable.of(queryResult).delay(REQUEST_DELAY);
                });
            });

            it('clears the previous result', (done: Function) => {
                comp.options = ['non empty'];

                testScheduler.onAction((actionName: string, delay: number, err?: any) => {
                    if (actionName === 'DebounceTimeSubscriber' && delay === DEBOUNCING_VALUE) {
                        expect(comp.options.length).toBe(0, `was [${comp.options.join(',')}]`);
                        done();
                    }
                });

                SpecUtils.focusAndInput('Londo', fixture, 'input');
                fixture.detectChanges();

                testScheduler.flush();
            });

            it('emits the start signal', (done: Function) => {
                spyOn(comp.onEvent, 'emit').and.callThrough();

                testScheduler.onAction((actionName: string, delay: number, err?: any) => {
                    if (actionName === 'DebounceTimeSubscriber' && delay === DEBOUNCING_VALUE) {
                        expect(comp.onEvent.emit).toHaveBeenCalledWith({signal: SuggestSignal.start});
                        done();
                    }
                });

                SpecUtils.focusAndInput('Lon', fixture, 'input');
                fixture.detectChanges();

                testScheduler.flush();
            });

            it('is throttling the possible hits of the API to 1 request per DEBOUNCING_VALUE milliseconds', (done: Function) => {

                spyOn(comp, 'suggest').and.callThrough();

                testScheduler.onAction((actionName: string, delay: number, err?: any) => {
                    // we expect the overall delay to be 5300 = DEBOUNCING_VALUE (debouncing) + REQUEST_DELAY (for request)
                    if (delay === (DEBOUNCING_VALUE + REQUEST_DELAY)) {
                        expect(comp.suggest).toHaveBeenCalledTimes(1);
                        expect(comp.suggest).toHaveBeenCalledWith('London');
                        done();
                    }
                });

                ['Lond', 'Londo', 'London'].forEach((userInput: string) => {
                    SpecUtils.focusAndInput(userInput, fixture, 'input');
                    fixture.detectChanges();
                });

                testScheduler.flush();
            });

        });
    });

    describe('book selection', () => {

        let timeInSyncKeeper;
        beforeEach(() => {
            fixture.detectChanges();
            timeInSyncKeeper = new AsyncZoneTimeInSyncKeeper();
        });

        it('emits bookSelected when the book gets selected', fakeAsync(() => {

            spyOn(comp.onBookSelected, 'emit').and.callThrough();

            SpecUtils.focusAndInput('Shake', fixture, 'input');
            timeInSyncKeeper.tick(DEBOUNCING_VALUE);
            fixture.detectChanges();

            let option = <HTMLElement> document.querySelector('md-option');
            option.click();

            timeInSyncKeeper.tick(REQUEST_DELAY);
            fixture.detectChanges();

            expect(comp.onBookSelected.emit).toHaveBeenCalledWith({
                title: 'Hamlet',
                authors: ['William Shakespeare']
            });

        }));
    });
});
