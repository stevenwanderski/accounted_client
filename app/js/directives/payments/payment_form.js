angular.module('accountedDirectives').directive('paymentForm', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/payments/payment_form.html'
  };
});