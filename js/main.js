angular.module('twoEnvelopes', ['ui.bootstrap']);

var Game = (function() {
  function Game() {
    this.count = 0;
    this.total = 0;
    this.payout = 0;
  }

  Game.prototype.keep = function() {
    this.payout = this.envelope1;
    this.updateTotal();
  }

  Game.prototype.swap = function() {
    this.payout = this.envelope2;
    this.updateTotal();
  }

  Game.prototype.updateTotal = function() {
    this.count += 1;
    this.total += this.payout;
  }

  Game.prototype.setupControl = function(amount) {
    this.envelope1 = amount;
    this.envelope2 = amount * 2 * Math.floor(Math.random() * 2);
  }

  Game.prototype.setupClassic = function(amount) {
    if(Math.floor(Math.random() * 2)) {
      this.envelope1 = amount;
      this.envelope2 = amount * 2;
    } else {
      this.envelope1 = amount * 2;
      this.envelope2 = amount;
    }
  }

  Game.prototype.setupBounded = function(min, max) {
    var amount = Math.floor(Math.random() * (max - min) + min);
    if(Math.floor(Math.random() * 2)) {
      this.envelope1 = amount;
      this.envelope2 = amount * 2;
    } else {
      this.envelope1 = amount * 2;
      this.envelope2 = amount;
    }
  }

  return Game;
})();

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
  $scope.keepCount = 1;
  $scope.swapCount = 1;
  $scope.game = new Game();
  $scope.game.setupControl($scope.amount);

  $scope.keep = function() {
    for(var i = 0; i < $scope.keepCount; i++) {
      $scope.game.keep();
      $scope.game.setupControl($scope.amount);
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.swapCount; i++) {
      $scope.game.swap();
      $scope.game.setupControl($scope.amount);
    }
  }

  $scope.reset = function() {
    $scope.game = new Game();
    $scope.game.setupControl($scope.amount);
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
}

function ClassicScenarioCtrl($scope, $modal) {
  $scope.amount = 100.0;
  $scope.keepCount = 1;
  $scope.swapCount = 1;
  $scope.game = new Game();
  $scope.game.setupClassic($scope.amount);

  $scope.keep = function() {
    for(var i = 0; i < $scope.keepCount; i++) {
      $scope.game.keep();
      $scope.game.setupClassic($scope.amount);
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.swapCount; i++) {
      $scope.game.swap();
      $scope.game.setupClassic($scope.amount);
    }
  }

  $scope.reset = function() {
    $scope.game = new Game();
    $scope.game.setupClassic($scope.amount);
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
}

function BoundedPeekingScenarioCtrl($scope, $modal) {
  $scope.min = 1;
  $scope.max = 3000000000;
  $scope.keepCount = 1;
  $scope.swapCount = 1;
  $scope.game = new Game();
  $scope.game.setupBounded($scope.min, $scope.max);

  $scope.keep = function() {
    for(var i = 0; i < $scope.keepCount; i++) {
      $scope.game.keep();
      $scope.game.setupBounded($scope.min, $scope.max);
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.swapCount; i++) {
      $scope.game.swap();
      $scope.game.setupBounded($scope.min, $scope.max);
    }
  }

  $scope.reset = function() {
    $scope.game = new Game();
    $scope.game.setupBounded($scope.min, $scope.max);
  }

  $scope.openSettings = function() {
    var modal = $modal.open({
      templateUrl: 'settings_bounded.html',
      controller: SettingsModalCtrl,
      resolve: {
        settings: function() { return {min: $scope.min, max: $scope.max}; }
      }
    });
    modal.result.then(function(settings) {
      $scope.min = settings.min;
      $scope.max = settings.max;
      $scope.reset();
    });
  }
}
