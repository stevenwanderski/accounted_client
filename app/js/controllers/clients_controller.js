angular.module('accountedControllers').controller('ClientsCtrl', function ($scope, $location, $routeParams, Client) {
  $scope.init = function(){
    initialize_clients();
    initialize_client();
  };

  $scope.addClient = function (client) {
    Client.save(client, function(data){
      $scope.clients.push(data);
    });
    $scope.reset();
  };

  $scope.updateClient = function(client) {
    Client.update({ id: $scope.client.id }, client, function(){
      $location.path('/clients');
    });
  };

  $scope.removeClient = function (client, $event) {
    $event.preventDefault();
    Client.delete({ id: client.id }, function(){
      Client.query(function(data) {
        $scope.clients = data;
      });
    });
  };

  $scope.reset = function () {
    $scope.client = {};
  };

  $scope.route_params_id = function(){
    return $routeParams.id;
  };

  var initialize_clients = function(){
    $scope.clients = [];
    Client.query(function(data) {
      $scope.clients = data;
    });
  };

  var initialize_client = function(){
    $scope.client = {};
    if($scope.route_params_id()){
      Client.get({ id: $scope.route_params_id() }, function(client){
        $scope.client = client;
      });
    }
  };

  $scope.init();
});