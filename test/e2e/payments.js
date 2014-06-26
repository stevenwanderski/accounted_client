describe('payments', function(){
  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', function(){
      var mock = angular.module('httpBackendMock', ['accounted', 'ngMockE2E']);
      mock.run(function($httpBackend){
        $httpBackend.whenGET('http://localhost:3000/api/payments').respond([
          { id: 1, amount_in_cents: 30000, payment_type: 'revenue', client_id: 1 }
        ]);
        $httpBackend.whenGET('http://localhost:3000/api/clients').respond([
          { id: 1, name: "Frank Zappa" },
          { id: 2, name: "Andrew Bird" }
        ]);
        $httpBackend.whenPOST('http://localhost:3000/api/payments').respond(201,
          { id: 1, amount_in_cents: 50000, payment_type: 'revenue', client_id: 1 }
        );
        $httpBackend.whenDELETE(/http:\/\/localhost:3000\/api\/payments\/[0-9]+/).respond(200);
        $httpBackend.whenPUT(/http:\/\/localhost:3000\/api\/payments\/[0-9]+/).respond(200);
        $httpBackend.whenGET('http://localhost:3000/api/payments/1').respond(
          { id: 1, amount_in_cents: 30000, payment_type: 'revenue', client_id: 1 }
        );
        $httpBackend.whenGET(/^partials/).passThrough();
      });
    });
  });

  describe('add payment', function(){
    it('adds a payment', function(){
      browser.get('app/#/payments');
      element(by.model('payment.amount_in_cents')).sendKeys("50000");
      element(by.css('#client_id option[value="1"]')).click();
      element(by.css('input[type="submit"]')).click();
      expect(element.all(by.css('.payment-item')).get(1).getText()).toContain('50000');
    });

    describe('form display', function(){
      it('displays the client select list', function(){
        browser.get('app/#/payments');
        element.all(by.css('#client_id option')).then(function(elems){
          // Client select list should have 3 elements: 2 clients and 1 "Choose..."
          expect(elems.length).toBe(3);
        });
      });

      it('displays the payment type select list', function(){
        browser.get('app/#/payments');
        expect(element(by.css('#payment_type option[value="revenue"]')).isPresent()).toBe(true);
        expect(element(by.css('#payment_type option[value="expense"]')).isPresent()).toBe(true);
      });
    });

    describe('validations', function(){
      it('is invalid when amount is blank', function(){
        browser.get('app/#/payments');
        element(by.model('payment.amount_in_cents')).sendKeys("");
        element(by.css('input[type="submit"]')).click();
        expect(element(by.model('payment.amount_in_cents')).getAttribute('class')).toMatch('ng-invalid');
      });

      it('is invalid when amount contains non-digits', function(){
        browser.get('app/#/payments');
        element(by.model('payment.amount_in_cents')).sendKeys("abc");
        element(by.css('input[type="submit"]')).click();
        expect(element(by.model('payment.amount_in_cents')).getAttribute('class')).toMatch('ng-invalid');
      });

      it('is invalid when client is blank', function(){
        browser.get('app/#/payments');
        element(by.css('#client_id option[value=""]')).click();
        element(by.css('input[type="submit"]')).click();
        expect(element(by.model('payment.client_id')).getAttribute('class')).toMatch('ng-invalid');
      });
    });
  });

  describe('remove payment', function(){
    it('removes the payment', function(){
      browser.get('app/#/payments');
      element.all(by.css('.remove-payment')).get(0).click();
      expect(element.all(by.repeater('payment in payments')).count()).toEqual(0);
    });
  });

  describe('edit payment', function(){
    it('updates a payment', function(){
      browser.get('app/#/payments');
      element(by.model('payment.amount_in_cents')).sendKeys('10000');
      element(by.css('input[type="submit"]')).click();
      element.all(by.css('.edit-payment')).get(0).click();

      element(by.model('payment.amount_in_cents')).sendKeys('20000');
      element(by.css('input[type="submit"]')).click();

      expect(browser.getCurrentUrl()).toMatch(/payments$/);
    });
  });
});
