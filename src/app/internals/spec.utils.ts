import {ComponentFixture} from '@angular/core/testing';

export class SpecUtils {

    static input(value: string, target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        let el = SpecUtils.getElement(target, selector);
        el.value = value;
        let evt = new Event('input');
        el.dispatchEvent(evt);
    }

    static blur(target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        let el = SpecUtils.getElement(target, selector);
        let evt = new Event('blur');
        el.dispatchEvent(evt);
    }

    static focus(target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        let el = SpecUtils.getElement(target, selector);
        el.focus();
    }

    static inputAndBlur(value: string, target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        let el = SpecUtils.getElement(target, selector);
        SpecUtils.input(value, el);
        SpecUtils.blur(el);
    }

    static focusAndInput(value: string, target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        let el = SpecUtils.getElement(target, selector);
        SpecUtils.focus(el);
        SpecUtils.input(value, el);
    }

    static getElement(target: HTMLInputElement | ComponentFixture<any>, selector?: string) {
        if (target instanceof ComponentFixture) {
            return (<ComponentFixture<any>> target).debugElement.nativeElement.querySelector(selector);
        }
        return <HTMLInputElement> target;
    }

    private constructor() {
    }
}
