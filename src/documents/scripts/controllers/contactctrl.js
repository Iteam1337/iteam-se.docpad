(function() {

  'use strict';

  angular.module('iteamse').controller('ContactCtrl', function($scope, $http) {

    $scope.inView = 0;

    $scope.changeContact = function (index) {
      console.log("index?", "hey", index);
      $scope.inView = index;
    };

  });

})();