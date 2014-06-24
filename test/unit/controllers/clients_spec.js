describe('clients controller', function(){
  var scope, clientsCtrl, httpMock, location, event;

  beforeEach(angular.mock.module('accounted'));
  beforeEach(angular.mock.inject(function($rootScope, $controller, $httpBackend, $location){
      scope = $rootScope.$new();
      location = $location;
      event = $.Event('click');

      httpMock = $httpBackend;
      httpMock.when('GET', 'http://localhost:3000/api/clients').respond(200, [{ id: 1, name: 'Andrew Bird' }]);
      httpMock.when('GET', 'http://localhost:3000/api/clients/1').respond(200, { id: 1, name: 'Andrew Bird' });
      httpMock.when('POST', 'http://localhost:3000/api/clients').respond(201, { id: 1, name: 'Frank Zappa' });
      httpMock.when('PUT', 'http://localhost:3000/api/clients/1').respond(200, { id: 1, name: 'Steve Vai' });
      httpMock.when('DELETE', 'http://localhost:3000/api/clients/1').respond(200);

      clientsCtrl = $controller('ClientsCtrl', { $scope: scope });
  }));

  afterEach(function() {
    httpMock.verifyNoOutstandingExpectation();
    httpMock.verifyNoOutstandingRequest();
  });

  describe('#reset', function(){
    it('makes client an empty object', function(){
      scope.client = { id: 1, name: 'Frank Zappa' };
      scope.reset();
      expect(scope.client).toEqual({});
      httpMock.flush();
    });
  });

  describe('#addClient', function(){
    it('calls the POST endpoint', function(){
      httpMock.expectPOST('http://localhost:3000/api/clients');
      scope.addClient({ name: 'Frank Zappa' });
      httpMock.flush();
    });

    it('adds the new client the clients array', function(){
      scope.addClient({ name: 'Frank Zappa' });
      httpMock.flush();
      expect(scope.clients.length).toEqual(2);
    });
  });

  describe('#updateClient', function(){
    it('calls the PUT endpoint', function(){
      httpMock.expectPUT('http://localhost:3000/api/clients/1');
      scope.client.id = 1;
      scope.updateClient({ id: 1, name: 'Steve Vai' });
      httpMock.flush();
    });

    it('redirects to clients', function(){
      spyOn(location, 'path');
      scope.client.id = 1;
      scope.updateClient({ id: 1, name: 'Steve Vai' });
      httpMock.flush();
      expect(location.path).toHaveBeenCalledWith('/clients');
    });
  });

  describe('#removeClient', function(){
    it('calls the DELETE endpoint', function(){
      httpMock.expectDELETE('http://localhost:3000/api/clients/1');
      scope.removeClient({ id: 1 }, event);
      httpMock.flush();
    });

    it('retrieves a fresh array of clients', function(){
      httpMock.expectGET('http://localhost:3000/api/clients');
      httpMock.expectGET('http://localhost:3000/api/clients');
      scope.removeClient({ id: 1 }, event);
      httpMock.flush();
    });
  });

  describe('#init', function(){
    it('calls the GET endpoint and assigns scope.clients', function(){
      httpMock.expectGET('http://localhost:3000/api/clients');
      httpMock.flush();
      expect(scope.clients.length).toEqual(1);
    });

    describe('when routeParams id is not present', function(){
      it('assigns an empty object to scope.client', function(){
        expect(scope.client).toEqual({});
        httpMock.flush();
      });
    });

    describe('when routeParams id is present', function(){
      it('calls the GET show request', function(){
        spyOn(scope, 'route_params_id').andReturn(1);
        httpMock.expectGET('http://localhost:3000/api/clients/1');
        scope.init();
        httpMock.flush();
      });

      it('assigns the returned object to scope.client', function(){
        spyOn(scope, 'route_params_id').andReturn(1);
        scope.init();
        httpMock.flush();
        expect(scope.client.name).toEqual('Andrew Bird');
      });
    });
  });
});