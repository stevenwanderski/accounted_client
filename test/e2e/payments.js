describe('payments', function(){
  beforeEach(function(){
    browser.get('app/index.html');
  });

  describe('click remove payment', function(){
    it('removes the payment', function(){
      element.all(by.css('.remove-payment')).get(0).click();
      expect(element.all(by.repeater('payment in payments')).count()).toEqual(2);
    });
  });

  describe('valid payment', function(){
    it('creates a payment', function(){
      element(by.model('payment.amount')).sendKeys('25');
      element(by.css('input[type="submit"]')).click();
      expect(element.all(by.repeater('payment in payments')).count()).toEqual(4);
    });
  });

  describe('invalid payment', function(){
    it('does not add the payment', function(){
      element(by.css('input[type="submit"]')).click();
      expect(element.all(by.repeater('payment in payments')).count()).toEqual(3);
    });
  });
});
