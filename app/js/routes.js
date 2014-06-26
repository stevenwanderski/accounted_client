accountedApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/clients', {
        templateUrl: 'partials/clients/clients.html',
        controller: 'ClientsCtrl'
      }).
      when('/clients/:id', {
        templateUrl: 'partials/clients/client_edit.html',
        controller: 'ClientsCtrl'
      }).
      when('/payments', {
        templateUrl: 'partials/payments/payments.html',
        controller: 'PaymentsCtrl'
      }).
      when('/payments/:id', {
        templateUrl: 'partials/payments/payment_edit.html',
        controller: 'PaymentsCtrl'
      }).
      otherwise({
        redirectTo: '/payments'
      });
}]);

