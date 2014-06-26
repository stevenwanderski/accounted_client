angular.module('accountedServices').factory('Client', function($resource){
  return $resource('http://localhost:3000/api/clients/:id', {}, {
    'update': { method: 'PUT' }
  });
});

angular.module('accountedServices').factory('Payment', function($resource){
  return $resource('http://localhost:3000/api/payments/:id', {}, {
    'update': { method: 'PUT' }
  });
});