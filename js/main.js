function ControlScenarioCtrl($scope) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.setEnvelopes()
    $scope.payout = $scope.envelope1;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.setEnvelopes()
    $scope.payout = $scope.envelope2;
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
  }

  $scope.setEnvelopes = function() {
    $scope.envelope1 = $scope.amount;
    $scope.envelope2 = $scope.amount * 2 * Math.floor(Math.random() * 2);
  }

  $scope.reset = function() {
    $scope.count = 0;
    $scope.payout = 0.0;
    $scope.total = 0.0;
  }
}

function ClassicScenarioCtrl($scope) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.setEnvelopes()
    $scope.payout = $scope.envelope1;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.setEnvelopes()
    $scope.payout = $scope.envelope2;
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
  }

  $scope.setEnvelopes = function() {
    if(Math.floor(Math.random() * 2)) {
      $scope.envelope1 = $scope.amount;
      $scope.envelope2 = $scope.amount * 2;
    } else {
      $scope.envelope1 = $scope.amount * 2;
      $scope.envelope2 = $scope.amount;
    }
  }

  $scope.reset = function() {
    $scope.count = 0;
    $scope.payout = 0.0;
    $scope.total = 0.0;
  }
}
