angular.module('twoEnvelopes', ['ui.bootstrap']);

function SettingsModalCtrl($scope, $modalInstance, settings) {
  $scope.settings = settings;

  $scope.ok = function() {
    $modalInstance.close(settings);
  }

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  }
}

function ControlScenarioCtrl($scope, $modal) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.payout = $scope.envelope1;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.payout = $scope.envelope2;
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
    $scope.setEnvelopes()
  }

  $scope.setEnvelopes = function() {
    $scope.envelope1 = $scope.amount;
    $scope.envelope2 = $scope.amount * 2 * Math.floor(Math.random() * 2);
  }

  $scope.reset = function() {
    $scope.count = 0;
    $scope.payout = 0.0;
    $scope.total = 0.0;
    $scope.setEnvelopes()
  }

  $scope.openSettings = function() {
    var modal = $modal.open({
      templateUrl: 'settings.html',
      controller: SettingsModalCtrl,
      resolve: {
        settings: function() { return {amount: $scope.amount}; }
      }
    });
    modal.result.then(function(settings) {
      $scope.amount = settings.amount;
      $scope.reset();
    });
  }

  $scope.setEnvelopes()
}

function ClassicScenarioCtrl($scope, $modal) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.payout = $scope.envelope1;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.payout = $scope.envelope2;
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
    $scope.setEnvelopes()
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
    $scope.setEnvelopes()
  }

  $scope.openSettings = function() {
    var modal = $modal.open({
      templateUrl: 'settings.html',
      controller: SettingsModalCtrl,
      resolve: {
        settings: function() { return {amount: $scope.amount}; }
      }
    });
    modal.result.then(function(settings) {
      $scope.amount = settings.amount;
      $scope.reset();
    });
  }

  $scope.setEnvelopes()
}

function NeoclassicScenarioCtrl($scope) {
  $scope.amount = 100.0;
  $scope.count = 0;
  $scope.payout = 0.0;
  $scope.total = 0.0;

  $scope.keep = function() {
    $scope.payout = $scope.envelope1;
    $scope.updateTotal();
  }

  $scope.swap = function() {
    $scope.payout = $scope.envelope2;
    $scope.updateTotal();
  }

  $scope.updateTotal = function() {
    $scope.count += 1;
    $scope.total += $scope.payout;
    $scope.setEnvelopes()
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
    $scope.setEnvelopes()
  }

  $scope.setEnvelopes()
}
