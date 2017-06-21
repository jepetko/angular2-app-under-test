import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
const {defineSupportCode} = require('cucumber');

const CustomWorld = function() {
    this.expect = chai.use(chaiAsPromised).expect;
};

defineSupportCode(function({setWorldConstructor}) {
    setWorldConstructor(CustomWorld);
});

defineSupportCode(function({setDefaultTimeout}) {
    setDefaultTimeout(60 * 1000);
});

export = CustomWorld;
