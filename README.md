# Angular2AppUnderTest: Google Books API + Google Books Viewer + fakeAsync + test schedulers

[![CircleCI](https://circleci.com/gh/jepetko/angular2-app-under-test.svg?style=svg)](https://circleci.com/gh/jepetko/angular2-app-under-test)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.

It uses:
* [Google Books API](https://developers.google.com/books/docs/v1/using)
* [Google Books Viewer](https://developers.google.com/books/docs/viewer/developers_guide)

It shows how to:
* take advantage of the fakeAsync testing approach
* fix timing issues by sharing the same time between the zone and RxJs
* inject your own schedulers in order to test RxJs events

## How to start

Since the Google Books API need to be "proxied" via proxy.conf file you need to start the server by issuing
`npm run start`.

Nevertheless, Google Books API might or might not work without the API key. The API key is secret and therefore not under version control.
A custom environment file is being used to add the Google API key:

1. create the file `./src/environments/environment.custom.ts`
2. add this content:
```typescript
export const environment = {
    production: false,
    GOOGLE_BOOKS_API_KEY: 'your_api_key'
};
```
3. execute `npm run start-custom`

## How to test

execute the tests as usual: `ng test`

## Hints to files you might be interested in

* `src/app/internals/fake-zone-and-test-scheduler-test.spec.ts`: helps to understand the `fakeAsync` utility and demonstrates the usage of the own scheduler
* `src/app/internals/async-zone-time-in-sync-keeper.utils.ts`: introduces the "in-sync-keeper" utility for fixing `fakeAsync` timing issues
* `src/app/internals/spying-test-scheduler.ts`: custom RxJs test scheduler
* `src/app/internals/monkey-patch-scheduler.utils.ts`: injects the spying test scheduler for testing purposes
* `**/*.spec.ts`: the actual usage of the testing utilities mentioned above
