accountedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/clients', {
        templateUrl: 'partials/clients.html',
        controller: 'ClientsCtrl'
      }).
      when('/clients/:id', {
        templateUrl: 'partials/client_edit.html',
        controller: 'ClientsCtrl'
      }).
      when('/payments', {
        templateUrl: 'partials/payments.html',
        controller: 'PaymentsCtrl'
      }).
      otherwise({
        redirectTo: '/payments'
      });
}]);

