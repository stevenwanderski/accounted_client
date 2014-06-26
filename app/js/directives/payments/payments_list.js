angular.module('accountedDirectives').directive('paymentsList', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/payments/payments_list.html'
  };
});