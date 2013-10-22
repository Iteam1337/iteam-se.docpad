;(function () {
  "use strict";
  angular.module(
    "iteamse.module.twitter",
    [
      "iteamse.factory.twitter"
    ]
  )
  /*
   * @desc
   *  Searches Twitter for a given twitter hashtag, mention or other
   */
  .directive("twitter", function ($twitter) {
    return {
      restrict: "A",
      replace: false,
      scope: {
        twitter: "@"
      },
      require: {
        twitter: "^"
      },
      link: function (scope, element) {
        /*
        scope.tweets = [];
        $twitter(scope.twitter, function (tweets) {
          scope.$apply(function () {
            scope.tweets = tweets;
          });
        });
        */
      }
    };
  });
})();