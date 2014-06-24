angular.module('accountedControllers').controller('PaymentsCtrl', function ($scope, Client) {
  $scope.payment = {};

  $scope.payments = [
    { amount: 100.00 },
    { amount: 75.00 },
    { amount: 50.00 }
  ];

  $scope.addPayment = function (payment) {
    $scope.payments.push(payment);
    $scope.reset();
  };

  $scope.removePayment = function (payment, $event) {
    $event.preventDefault();
    var index = $scope.payments.indexOf(payment);
    $scope.payments.splice(index, 1);
  };

  $scope.reset = function () {
    $scope.payment = {};
  };
});