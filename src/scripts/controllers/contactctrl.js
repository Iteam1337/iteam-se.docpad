;(function (angular) {
  "use strict";

  angular.module("iteamse").controller("ContactCtrl", function ($scope) {

    $scope.inView = 0;

    $scope.changeContact = function (index) {
      $scope.inView = index;
    };

  });

})(angular);