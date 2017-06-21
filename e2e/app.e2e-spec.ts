import { Angular2AppUnderTestPage } from './app.po';

describe('angular2-app-under-test App', () => {
  let page: Angular2AppUnderTestPage;

  beforeEach(() => {
    page = new Angular2AppUnderTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
