import { SquaregamePage } from './app.po';

describe('squaregame App', function() {
  let page: SquaregamePage;

  beforeEach(() => {
    page = new SquaregamePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
