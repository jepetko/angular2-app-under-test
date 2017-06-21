const {defineSupportCode} = require('cucumber');
import {ShopPage} from '../../page-objects/shop-page.po';

defineSupportCode(function({Given, When, Then}) {

    const shopPage = new ShopPage();

    Given(/^as user I want to see all books$/, function (callback) {
        callback();
    });

    When(/^I visit the shop$/, function () {
        return shopPage.open();
    });

    Then(/^I can see all available books in a list$/, function () {
        return shopPage.getListItemTexts().then(texts => {
            return this.expect(texts.length).to.eq(50);
        })
    });

});
