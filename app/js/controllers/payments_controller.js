angular.module('accountedControllers').controller('PaymentsCtrl', function ($scope, $routeParams, $location, Payment, Client) {
  $scope.init = function(){
    initialize_payments();
    initialize_payment();
    initialize_clients();
  };

  $scope.addPayment = function (payment) {
    $scope.payments.push(Payment.save(payment));
    $scope.reset();
  };

  $scope.updatePayment = function(payment) {
    Payment.update({ id: $scope.payment.id }, payment, function(){
      $location.path('/payments');
    });
  };

  $scope.removePayment = function (payment, $event) {
    $event.preventDefault();
    Payment.delete({ id: payment.id }, function(){
      $scope.payments = _.reject($scope.payments, function(_payment){ return _payment.id == payment.id; });
    });
  };

  $scope.reset = function () {
    $scope.payment = {};
  };

  $scope.route_params_id = function(){
    return $routeParams.id;
  };

  var initialize_payment = function(){
    $scope.payment = {};
    if($scope.route_params_id()){
      Payment.get({ id: $scope.route_params_id() }, function(payment){
        $scope.payment = payment;
      });
    }
  };

  var initialize_payments = function(){
    $scope.payments = [];
    Payment.query(function(data){
      $scope.payments = data;
    });
  };

  var initialize_clients = function(){
    $scope.clients = [];
    Client.query(function(data) {
      $scope.clients = data;
    });
  };

  $scope.init();
});