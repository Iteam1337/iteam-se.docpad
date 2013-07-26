(function() {

  'use strict';

  angular.module('iteamse').controller('FeedbackCtrl', function($scope, $http) {

    $scope.inView = 0;

    $scope.changeFeedback = function (index) {
      $scope.inView = index;
    };

  });

})();