angular.module('accountedControllers').controller('ClientsCtrl', function ($scope, $location, $routeParams, Client) {
  $scope.init = function(){
    initialize_clients();
    initialize_client();
  };

  $scope.addClient = function (client) {
    $scope.clients.push(Client.save(client));
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
      $scope.clients = _.reject($scope.clients, function(_client){ return _client.id == client.id; });
    });
  };

  $scope.reset = function () {
    $scope.client = {};
  };

  $scope.route_params_id = function(){
    return $routeParams.id;
  };

  $scope.submit = function(form, client){
    if(form.$valid === false){
      return false;
    }
    if($scope.route_params_id()){
      $scope.updateClient(client);
    }else{
      $scope.addClient(client);
    }
  };

  var initialize_clients = function(){
    $scope.clients = Client.query();
  };

  var initialize_client = function(){
    $scope.client = {};
    if($scope.route_params_id()){
      $scope.client = Client.get({ id: $scope.route_params_id() });
    }
  };

  $scope.init();
});