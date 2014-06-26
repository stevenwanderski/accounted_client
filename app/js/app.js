var accountedApp = angular.module('accounted', [
  'accountedRoutes',
  'accountedControllers',
  'accountedServices',
  'accountedDirectives'
]);
angular.module('accountedRoutes', ['ngRoute']);
angular.module('accountedServices', ['ngResource']);
angular.module('accountedControllers', []);
angular.module('accountedDirectives', []);