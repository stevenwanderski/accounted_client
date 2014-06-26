describe('clients', function(){

  beforeEach(function(){
    ptor = protractor.getInstance();
    ptor.addMockModule('httpBackendMock', function(){
      var mock = angular.module('httpBackendMock', ['accounted', 'ngMockE2E']);
      mock.run(function($httpBackend){
        $httpBackend.whenGET('http://localhost:3000/api/clients').respond([]);
        $httpBackend.whenPOST('http://localhost:3000/api/clients').respond(function(method, url, data) {
          return [201, {id: 1, name: 'Frank Zappa'}, {}];
        });
        $httpBackend.whenDELETE(/http:\/\/localhost:3000\/api\/clients\/[0-9]+/).respond(200);
        $httpBackend.whenPUT(/http:\/\/localhost:3000\/api\/clients\/[0-9]+/).respond(200);
        $httpBackend.whenGET('http://localhost:3000/api/clients/1').respond({ id: 1, name: 'Frank Zappa' });
        $httpBackend.whenGET(/^partials/).passThrough();
      });
    });
  });

  describe('add client', function(){
    it('creates a new client', function(){
      browser.get('app/#/clients');
      element(by.model('client.name')).sendKeys('Frank Zappa');
      element(by.css('input[type="submit"]')).click();
      expect(element.all(by.css('.client-item')).get(0).getText()).toContain('Frank Zappa');
    });
  });

  describe('remove client', function(){
    it('removes a client', function(){
      browser.get('app/#/clients');
      element(by.model('client.name')).sendKeys('Frank Zappa');
      element(by.css('input[type="submit"]')).click();
      element.all(by.css('.remove-client')).get(0).click();
      expect(element.all(by.repeater('client in clients')).count()).toEqual(0);
    });
  });

  describe('edit client', function(){
    it('updates a client', function(){
      browser.get('app/#/clients');
      element(by.model('client.name')).sendKeys('Frank Zappa');
      element(by.css('input[type="submit"]')).click();
      element.all(by.css('.edit-client')).get(0).click();

      element(by.model('client.name')).sendKeys('Steve Vai');
      element(by.css('input[type="submit"]')).click();

      expect(browser.getCurrentUrl()).toMatch(/clients$/);
    });
  });
});