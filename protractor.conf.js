// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');

exports.config = {
    allScriptsTimeout: 21000,
    specs: [
        './e2e/**/*.feature'
    ],
    cucumberOpts: {
        require: ['./e2e/support/world.ts', './e2e/**/*.steps.ts'],
        format: 'json:./e2e-report/protractor-cucumber-report.json',
        tags: '~@ignore'
    },
    capabilities: {
        'browserName': 'chrome'
    },
    directConnect: true,
    baseUrl: 'http://localhost:4200/',
    framework: 'custom',
    frameworkPath: require.resolve('protractor-cucumber-framework'),
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 30000,
        print: function() {}
    },
    beforeLaunch: function() {
        require('ts-node').register({
            project: 'e2e/tsconfig.e2e.json'
        });
    },
    onPrepare() {
        // jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
        // browser.manage().window().maximize();
    }
};
