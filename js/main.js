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
    var amount = Math.floor(Math.random() * ((max - min) / 2) + min);
    if(Math.floor(Math.random() * 2)) {
      this.envelope1 = amount;
      this.envelope2 = amount * 2;
    } else {
      this.envelope1 = amount * 2;
      this.envelope2 = amount;
    }
  }

  Game.prototype.setupDoubleOrHalf = function(amount) {
    if(Math.floor(Math.random() * 2)) {
      this.envelope1 = amount;
      this.envelope2 = amount * 2;
    } else {
      this.envelope1 = amount;
      this.envelope2 = amount / 2;
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
  $scope.repeater = { keepCount: 1, swapCount: 1, enabled: false }
  $scope.amount = 100.0;
  $scope.game = new Game();
  $scope.game.setupControl($scope.amount);

  $scope.keep = function() {
    for(var i = 0; i < $scope.repeater.keepCount; i++) {
      $scope.game.keep();
      $scope.game.setupControl($scope.amount);
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.repeater.swapCount; i++) {
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
  $scope.repeater = { keepCount: 1, swapCount: 1, enabled: false }
  $scope.amount = 100.0;
  $scope.game = new Game();
  $scope.game.setupClassic($scope.amount);

  $scope.keep = function() {
    for(var i = 0; i < $scope.repeater.keepCount; i++) {
      $scope.game.keep();
      $scope.game.setupClassic($scope.amount);
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.repeater.swapCount; i++) {
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
  $scope.max = 3000;
  $scope.game = new Game();
  $scope.game.setupBounded(1, $scope.max);

  $scope.keep = function() {
    $scope.game.keep();
    $scope.game.setupBounded(1, $scope.max);
  }

  $scope.swap = function() {
    $scope.game.swap();
    $scope.game.setupBounded(1, $scope.max);
  }

  $scope.reset = function() {
    $scope.game = new Game();
    $scope.game.setupBounded(1, $scope.max);
  }

  $scope.openSettings = function() {
    var modal = $modal.open({
      templateUrl: 'settings_bounded.html',
      controller: SettingsModalCtrl,
      resolve: {
        settings: function() { return {max: $scope.max}; }
      }
    });
    modal.result.then(function(settings) {
      $scope.max = settings.max;
      $scope.reset();
    });
  }
}

function DoubleOrHalfScenarioCtrl($scope, $modal) {
  $scope.repeater = { keepCount: 1, swapCount: 1, enabled: false }
  $scope.amount = 100.0;
  $scope.game = new Game();

  $scope.keep = function() {
    for(var i = 0; i < $scope.repeater.keepCount; i++) {
      $scope.game.setupDoubleOrHalf($scope.amount);
      $scope.game.keep();
    }
  }

  $scope.swap = function() {
    for(var i = 0; i < $scope.repeater.swapCount; i++) {
      $scope.game.setupDoubleOrHalf($scope.amount);
      $scope.game.swap();
    }
  }

  $scope.reset = function() {
    $scope.game = new Game();
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
