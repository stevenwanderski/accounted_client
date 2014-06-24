var accountedApp = angular.module('accounted', [
  'accountedRoutes',
  'accountedControllers',
  'accountedServices',
]);
angular.module('accountedRoutes', ['ngRoute']);
angular.module('accountedServices', ['ngResource']);
angular.module('accountedControllers', []);