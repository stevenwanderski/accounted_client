describe('PaymentsCtrl', function(){
  var scope, paymentsCtrl, httpMock, location, event;

  beforeEach(angular.mock.module('accounted'));
  beforeEach(angular.mock.inject(function($rootScope, $controller, $location, $httpBackend){
      scope = $rootScope.$new();
      location = $location;
      event = $.Event('click');

      httpMock = $httpBackend;
      httpMock.when('GET', 'http://localhost:3000/api/clients').respond(200, [{ id: 1, name: 'Andrew Bird' }]);
      httpMock.when('GET', 'http://localhost:3000/api/payments').respond(200, [payment_factory]);
      httpMock.when('GET', 'http://localhost:3000/api/payments/1').respond(200, payment_factory);
      httpMock.when('POST', 'http://localhost:3000/api/payments').respond(201, payment_factory);
      httpMock.when('PUT', 'http://localhost:3000/api/payments/1').respond(200, payment_factory);
      httpMock.when('DELETE', 'http://localhost:3000/api/payments/1').respond(200);

      paymentsCtrl = $controller('PaymentsCtrl', { $scope: scope });
  }));

  afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
  });

  describe('#reset', function(){
    it('makes payment an empty object', function(){
      scope.payment = payment_factory;
      scope.reset();
      expect(scope.payment).toEqual({});
      httpMock.flush();
    });
  });

  describe('#addPayment', function(){
    it('calls the POST endpoint', function(){
      httpMock.expectPOST('http://localhost:3000/api/payments');
      scope.addPayment(payment_factory);
      httpMock.flush();
    });

    it('adds the new payment to the payments array', function(){
      scope.addPayment(payment_factory);
      httpMock.flush();
      expect(scope.payments[0].amount_in_cents).toEqual(payment_factory.amount_in_cents);
    });
  });

  describe('#updateClient', function(){
    it('calls the PUT endpoint', function(){
      httpMock.expectPUT('http://localhost:3000/api/payments/1');
      scope.payment.id = 1;
      scope.updatePayment(payment_factory);
      httpMock.flush();
    });

    it('redirects to payments', function(){
      spyOn(location, 'path');
      scope.payment.id = 1;
      scope.updatePayment(payment_factory);
      httpMock.flush();
      expect(location.path).toHaveBeenCalledWith('/payments');
    });
  });

  describe('#removeClient', function(){
    it('calls the DELETE endpoint', function(){
      httpMock.expectDELETE('http://localhost:3000/api/payments/1');
      scope.removePayment({ id: 1 }, event);
      httpMock.flush();
    });

    it('decrements payments array by 1', function(){
      scope.payments.push(payment_factory);
      scope.removePayment({ id: payment_factory.id }, event);
      httpMock.flush();
      expect(scope.payments.length).toBe(0);
    });
  });

  describe('#init', function(){
    it('calls the GET endpoint and assigns scope.payments', function(){
      httpMock.expectGET('http://localhost:3000/api/payments');
      httpMock.flush();
      expect(scope.payments.length).toEqual(1);
    });

    describe('when routeParams id is not present', function(){
      it('assigns an empty object to scope.client', function(){
        expect(scope.payment).toEqual({});
        httpMock.flush();
      });
    });

    describe('when routeParams id is present', function(){
      it('calls the GET show request', function(){
        spyOn(scope, 'route_params_id').andReturn(1);
        httpMock.expectGET('http://localhost:3000/api/payments/1');
        scope.init();
        httpMock.flush();
      });

      it('assigns the returned object to scope.client', function(){
        spyOn(scope, 'route_params_id').andReturn(1);
        scope.init();
        httpMock.flush();
        expect(scope.payment.amount_in_cents).toEqual(payment_factory.amount_in_cents);
      });
    });
  });

  var payment_factory = function(){
    return {
      id: 1,
      amount_in_cents: 30000,
      payment_type: 'revenue',
      client_id: 1
    };
  }();

});