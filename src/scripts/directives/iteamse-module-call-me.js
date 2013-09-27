;
(function (angular, stdlib) {
    "use strict";
    angular.module(
            "iteamse.module.call-me",
            []
        )
        /*
         * @desc
         *   This is used to render the call-me-elements.
         *   Example:
         *     <call-me />
         */
        .directive("callMe", function ($http) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "/content/partials/call-me-modal.html",
                link: function (scope, element, attrs) {
                    // console.log("call me modal loaded!");
                }
            };
        })

        /*
         * The call me button.
         */
        .directive("callMeButton", function ($http) {
            return {
                restrict: "E",
                replace: true,
                scope: true,
                templateUrl: "/content/partials/call-me-button.html",
                link: function () {
                    //console.log("call me button loaded!");
                }
            };
        });


})(angular, window);