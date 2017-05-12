import { FcpeFrPage } from './app.po';

describe('fcpe-fr App', () => {
  let page: FcpeFrPage;

  beforeEach(() => {
    page = new FcpeFrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
