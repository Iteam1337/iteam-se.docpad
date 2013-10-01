;(function () {
  "use strict";
  angular.module(
    "iteamse.module.instagram",
    []
  )
  /*
   * @desc
   *   This is used to render the instagram-elements.
   *   The Values needed are a name-attribute and
   *     a max-attribute (optional.)
   *   Example:
   *     <instagram name="ankjevel" max="3"></instagram>
   */
  .directive("instagram", function ($http) {
    return {
      restrict: "E",
      replace: true,
      scope: {
        name: "@",
        max: "@",
        css: "@"
      },
      templateUrl: "/content/partials/instagram.html",
      link: function (scope, element) {
        var options;

        scope.instagramFeed = [];

        scope.max = +scope.max || 3;

        if (typeof scope.name !== "string" || !scope.name) {
          return;
        }

        options = {
          url: "http://insta-team.se/user/" + scope.name + "?count=" + scope.max,
          method: "GET"
        };

        $http(options).success(function (content) {
          if (!content && !content.data && !(content.data instanceof Array)) {
            return;
          }
          scope.instagramFeed = content.data;
        }).error(function (data) {
          stdlib.console.error(data);
        });
      }
    };
  });
})();