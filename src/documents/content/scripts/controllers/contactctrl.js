(function (stdlib, stdang) {
    "use strict";

    stdang.module("iteamse").controller("ContactCtrl", function ($scope) {

        $scope.inView = 0;

        $scope.changeContact = function (index) {
            stdlib.console.log("index?", "hey", index);
            $scope.inView = index;
        };

    });

})(window, angular);