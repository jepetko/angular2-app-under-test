import {browser, element, by} from 'protractor';

export class ShopPage {

    open() {
        return browser.get('/');
    }

    getListItems() {
        return element.all(by.css('li'));
    }

    getListItemTexts() {
        return this.getListItems().getText();
    }

}