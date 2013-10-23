function ControlScenarioCtrl($scope) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.payout = $scope.amount;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.payout = $scope.amount * 2 * Math.floor(Math.random() * 2);
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
  }

  $scope.reset = function() {
    $scope.count = 0;
    $scope.payout = 0.0;
    $scope.total = 0.0;
  }
}
