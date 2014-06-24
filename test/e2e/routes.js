describe('routing', function(){
  describe('homepage', function(){
    it('redirects to /payments', function(){
      browser.get('app/index.html');
      expect(browser.getCurrentUrl()).toMatch(/payments/);
    });
  });

  describe('global nav', function(){
    describe('click payments nav link', function(){
      it('redirects to /payments', function(){
        element(by.css('a[href="#payments"]')).click();
        expect(browser.getCurrentUrl()).toMatch(/payments/);
      });
    });

    describe('click clients nav link', function(){
      it('redirects to /clients', function(){
        element(by.css('a[href="#clients"]')).click();
        expect(browser.getCurrentUrl()).toMatch(/clients/);
      });
    });
  });

  describe('clients', function(){
    describe('click edit', function(){
      it('redirects to /clients/:id', function(){
        browser.get('app/#/clients');
        element(by.model('client.name')).sendKeys('Frank Zappa');
        element(by.css('input[type="submit"]')).click();
        element.all(by.css('.edit-client')).get(0).click();
        expect(browser.getCurrentUrl()).toMatch(/clients\/[a-zA-Z0-9]+/);
      });
    });
  });
});
