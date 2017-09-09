import {AsyncAction} from 'rxjs/scheduler/AsyncAction';
import {VirtualTimeScheduler, VirtualAction} from 'rxjs/scheduler/VirtualTimeScheduler';

const defaultMaxFrame = 750;

export class SpyingTestScheduler extends VirtualTimeScheduler {

    spyFn: (actionName: string, delay: number, error?: any) => void;
    constructor() {
        super(VirtualAction, defaultMaxFrame);
    }

    onAction(spyFn: (actionName: string, delay: number, error?: any) => void) {
        this.spyFn = spyFn;
    }

    flush() {
        const {actions, maxFrames} = this;
        let error: any, action: AsyncAction<any>;

        while ((action = actions.shift()) && (this.frame = action.delay) <= maxFrames) {
            let stateName = this.detectStateName(action);
            let delay = action.delay;
            if (error = action.execute(action.state, action.delay)) {
                if (this.spyFn) {
                    this.spyFn(stateName, delay, error);
                }
                break;
            } else {
                if (this.spyFn) {
                    this.spyFn(stateName, delay);
                }
            }
        }

        if (error) {
            while (action = actions.shift()) {
                action.unsubscribe();
            }
            throw error;
        }
    }

    private detectStateName(action: AsyncAction<any>): string {
        const c = Object.getPrototypeOf(action.state).constructor;
        const argsPos = c.toString().indexOf('(');
        if (argsPos !== -1) {
            return c.toString().substring(9, argsPos);
        }
        return null;
    }
}
